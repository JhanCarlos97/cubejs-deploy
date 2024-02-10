import unittest

path_to_file = 'example_files/standard_cube.js'
correct_string = 'cube(`'

def parse_cube_name(
    text_line: str,
    position_number: int
):
    for current_position in range(position_number, len(text_line)):
        if text_line[current_position] == '`':
            cube_name = text_line[position_number:current_position]
            return cube_name
    
    raise ValueError('Cube object final quote was not found')


def validate_and_return_cube_name(
    path_to_file: str, 
    correct_string: str,
    ignore_file_type: bool):
    
    #Making sure the file is indeed js
    if path_to_file.lower().endswith('.js'):
        pass
    elif ignore_file_type:
        return
    else:
        raise TypeError('File format needs to be .js')

    #Opening the file from the path and saving as a list, each line being a value
    with open(path_to_file) as f:
        lines_list = f.readlines()

    correct_string_size = len(correct_string)

    #Iterating through all of the lines to find the cube description, and then iterating over the characters of a line
    for current_line in lines_list:
        for character_number in range(len(current_line)):
            #If it is a blank space, just move forward to the next character
            if current_line[character_number] == ' ':
                continue
            #If if is a js comment, just move down to the next line
            elif current_line[character_number:character_number+2] == '//' or current_line[character_number] == '\n':
                break
            #Or if it has any other character try to match it with the correct string
            else:
                if current_line[character_number:character_number + correct_string_size].lower() == correct_string:
                    #If it was indeed valid, utilize the position to already return what is the cube name and parse it
                    cube_name = parse_cube_name(current_line, character_number + correct_string_size)
                    return cube_name
                else:
                    raise ValueError(f'Cube file had a line with {current_line} before the Cube was defined')

    raise ValueError('File ended without a cube being defined')


class TestCubeFormatting(unittest.TestCase):
    def test_normal_cube_case(self):
        self.assertEqual(validate_and_return_cube_name('example_files/standard_cube.js', correct_string, False), 'Occupancy')

    def test_commented_cube_case(self):
        self.assertEqual(validate_and_return_cube_name('example_files/commented_cube.js', correct_string, False), 'Occupancy Test')

    def test_wrong_cube_case(self):
        with self.assertRaises(ValueError) as exception_context:
            validate_and_return_cube_name('example_files/wrong_cube.js', correct_string, False)
            self.assertEqual(
                str(exception_context.exception),
                ValueError(f'Cube file had a line with sql: `SELECT*FROM"leasing".occupancy`, before the Cube was defined')
            )

    def test_empty_cube_case(self):
        with self.assertRaises(ValueError) as exception_context:
            validate_and_return_cube_name('example_files/wrong_cube.js', correct_string, False)
            self.assertEqual(
                str(exception_context.exception),
                ValueError('File ended without a cube being defined')
            )
 
    def test_wrong_text_format_case(self): 
        with self.assertRaises(ValueError) as exception_context:
            validate_and_return_cube_name('example_files/wrong_cube.js', correct_string, False)
            self.assertEqual(
                str(exception_context.exception),
                ValueError('File ended without a cube being defined')
            )

if __name__ == '__main__':
    unittest.main()
