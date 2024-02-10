# This script specifies and creates rules for Cube nomenclature, specifies a folder directory,
# and adjusts Cube naming for all files and sends it to the correct folder. It also includes
# functionality to change the filename of the cube files to camel case and to remove the joins
# automatically generated by Cube so that a primary key does not have to be manually input for every table.
from typing import List

import os 

files_target_directory = 'staging_test' # directory where the modified files will be stored
files_prefix = 'stg' # prefix to be added to the modified file names
schema_naming = 'pmsaccounting' # naming scheme for the modified files
datasource_naming = 'snowflake_pms' # name for datasource in Cube

def change_filename_case(filename: str) -> str:
    """
    Changes the filename of the cube files to camel case
    Args:
        filename (str): The name of the file to be changed
    Returns:
        str: The modified filename in camel case
    """
    for letter_pos in range(0, len(filename)):
        if filename[letter_pos].islower() == True:
            filename = filename[0:letter_pos-1].lower() + filename[letter_pos-1:-3]
            return filename
        elif filename[letter_pos] == ".":
            filename = filename[0:letter_pos].lower()
            return filename

def remove_schema_joins(file_lines: List[str]) -> List[str]:
    """
    Removes the joins automatically generated by Cube so that a primary key does not have to be manually input for every table
    Args:
        file_lines (List[str]): List of lines in the file
    Returns:
        List[str]: List of lines in the file with the joins removed
    """
    join_flag = False
    for line_pos in range(len(file_lines)):

        if file_lines[line_pos] == '  joins: {\n':
            first_line = line_pos
            join_flag = True

        elif file_lines[line_pos] == '  },\n' and join_flag == True:
            file_lines = file_lines[0:first_line-1] + file_lines[line_pos+1:]
            return file_lines
            
    return file_lines

new_file_contents = ''
#Will also copy the first two lines of each file and paste it all into a raw file
raw_file = ''

for filename in os.listdir("schema/"):
    file_path = f"schema/{filename}"
    if os.path.isfile(file_path) and 'Airbyte' not in filename:


        # filename = change_filename_case(filename)
        new_cube_naming = f'{files_prefix}_{schema_naming}_{filename}'
        
        with open(file_path, "r+") as f:
            file_lines = f.readlines()

            # Make sure the file really starts with the cube definition
            if file_lines[0][0:5] != 'cube(':
                raise Exception("First line of Cube file doesn't start with Cube definition")
            
            # Changing first line of the Cube file to be in the format we want
            # file_lines[0] = 'cube(`' + new_cube_naming + '`, {\n'

            # raw_file += ('cube(`raw_' + schema_naming + '_' + filename + '`, { ' + file_lines[1][:-2] + '});\n')

            if file_lines[1][0:6] != '  sql:':
                raise Exception("Second line of Cube file doesn't start with the sql definition")

            # file_lines[1] = '  sql: `SELECT * FROM ${raw_' + schema_naming + '_' + filename + '.sql()}`,\n'

            if file_lines[-2][0:13] != '  dataSource:':
                print(file_lines)
                print(file_lines[-2][0:13])
                raise Exception("Third last line of Cube file doesn't end with Data Source")

            file_lines[-2] = '  dataSource: `'+ datasource_naming + '`\n'
            
            # file_lines = remove_schema_joins(file_lines)
            new_file_contents = "".join(file_lines)
        
        # write the modified contents to the new file
        with open(f'schema/{files_target_directory}/{filename}', "w") as f:
            f.write(new_file_contents)

        # write the raw contents to a separate file
        with open(f'schema/{files_target_directory}/{schema_naming}.js', "w") as f:
            f.write(raw_file)

            
        