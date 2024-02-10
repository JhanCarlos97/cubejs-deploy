import unittest

import os

from file_parser import validate_and_return_cube_name

path_to_cubes = '../CubeJS/schema'
correct_string = 'cube(`'
cube_name = 'RawOccupancy'

def gather_and_compare_cube_names(
    cubes_path: str,
    new_cube_name: str
):
    cube_names = {}
    #Walk into the folders and files inside the cubes_path
    for (dirpath, dirnames, filenames) in os.walk(cubes_path):
        for file in filenames:
           file_path = os.path.join(dirpath, file)
           #It uses the validate function to return the name of the cubes and save its file name and cube name into a list
           cube_names[validate_and_return_cube_name(file_path, correct_string, True)] = file

    #If there is already a cube with that name, the function fails
    if new_cube_name in cube_names.keys():
        raise ValueError(f'Cube {new_cube_name} already exists in file {cube_names[new_cube_name]}')
    else:
        print(f'Cube {new_cube_name} do not have any duplicates')
        return f'Cube {new_cube_name} do not have any duplicates'


class TestCubeFormatting(unittest.TestCase):
    def test_normal_cube_case(self):
        self.assertEqual(gather_and_compare_cube_names(path_to_cubes, 'NewCube'), 'Cube NewCube do not have any duplicates')

    def test_wrong_cube_case(self):
        with self.assertRaises(ValueError) as exception_context:
            self.assertEqual(gather_and_compare_cube_names(path_to_cubes, 'RawOccupancy'))
            self.assertEqual(
                str(exception_context.exception),
                ValueError(f'Cube RawOccupancy already exists in file Occupancy')
            )

if __name__ == '__main__':
    unittest.main()

