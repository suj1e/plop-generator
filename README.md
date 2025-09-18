# plop-backend-generator

A simple yet powerful code generator for backend applications using [Plop](https://plopjs.com/). This tool helps you quickly scaffold controllers, services, models, and full CRUD modules for your Node.js backend projects.

## Features

- Generate individual controllers, services, and models
- Generate full CRUD modules with a single command
- Consistent code structure across your project
- Time-saving automation for repetitive tasks

## Installation

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

## Usage

Run the generator with:

```bash
npm run generate
```

You will be prompted to choose a generator and provide necessary information.

### Available Generators

1. **controller**: Generate a new controller
2. **service**: Generate a new service
3. **model**: Generate a new model
4. **module**: Generate a full CRUD module (controller + service + model)

### Example

To generate a full user module:

```bash
npm run generate
# Select 'module'
# Enter 'User' as the module name
```

This will create:
- `src/controllers/UserController.js`
- `src/services/UserService.js`
- `src/models/UserModel.js`

## Project Structure

Generated files will be created in the following structure:

```
src/
  controllers/
    [Name]Controller.js
  services/
    [Name]Service.js
  models/
    [Name]Model.js
```

## Customization

You can customize the templates by modifying the files in the `plop-templates/` directory.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.