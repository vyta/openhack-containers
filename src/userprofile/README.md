# Overview

This is the User Profile API for the Trip Insights service.

## Dependencies

The User Profile API has a dependency on a SQL Server compatible database to hold the user profiles.

## API Paths

| Method  | Path                   |Description                                               |
|---------|------------------------|----------------------------------------------------------|
| GET     | /api/user/{id}         | Fetch the UserProfile for a specific user                |
| GET     | /api/healthcheck/user  | Return the healthcheck status for the UserProfile API    |
| GET     | /api/docs/user         | Return the OpenAPI documentation for the UserProfile API |


## Configuration

The User Profile API is configured via the variables in the table below.

The value for a variable may be specified via an environment variable (ENV) or as the contents of a file. If the `CONFIG_FILES_PATH` environment variable is specified, then configuration values are expected to be available in files located in the specified base path.

If the environment variable or file is not provided and there is a default value available, then the default value will be used.

| Name                      | Type        | Default Value | Description                                   |
|---------------------------|-------------|---------------|-----------------------------------------------|
| PORT                      | ENV         | 80            | The port that the API service will listen on. |
| CONFIG_FILES_PATH         | ENV         |               | The base path for file based variables.       |
| SQL_USER                  | ENV or File | sqladmin      | The username for the SQL Server database.     |
| SQL_PASSWORD              | ENV or File |               | The password for the SQL Server database.     |
| SQL_SERVER                | ENV or File |               | The server name for the SQL Server database.  |
| SQL_DBNAME                | ENV or File | mydrivingDB   | The name of the SQL Server database.          |

## Run in Docker

To build the image

Bash
```bash
$ docker build --no-cache --build-arg IMAGE_VERSION="1.0" --build-arg IMAGE_CREATE_DATE="`date -u +"%Y-%m-%dT%H:%M:%SZ"`" --build-arg IMAGE_SOURCE_REVISION="`git rev-parse HEAD`" -f Dockerfile -t "tripinsights/userprofile:1.0" .
```

Powershell
```powershell
PS> docker build --no-cache --build-arg IMAGE_VERSION="1.0" --build-arg IMAGE_CREATE_DATE="$(Get-Date((Get-Date).ToUniversalTime()) -UFormat '%Y-%m-%dT%H:%M:%SZ')" --build-arg IMAGE_SOURCE_REVISION="$(git rev-parse HEAD)" -f Dockerfile -t "tripinsights/userprofile:1.0" .
```

To run the image

```bash
# Example 1 - set config values via environment variables
$ docker run -d -p 8080:80 --name userprofile -e "SQL_PASSWORD=$SQL_PASSWORD" -e "SQL_SERVER=$SQL_SERVER" tripinsights/userprofile:1.0

# Example 2 - set configuration via files. Server will expect config values in files like /configmnt/SQL_USER.
$ docker run -d -p 8080:80 --name userprofile -e "CONFIG_FILES_PATH=/configmnt" -v $HOST_FOLDER:/configmnt tripinsights/userprofile:1.0
```

## Run locally

To run the server, run:

```shell
npm start
```

To execute the unit tests

```shell
npm run test
```

There will be a junit formatted report file called userprofile-report.xml under the current userprofile directory `/reports` subfolder.