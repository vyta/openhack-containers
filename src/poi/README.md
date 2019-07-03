
# POI Service

## Overview

The POI (Point Of Interests) API collects the points of the trip when a hard stop or hard acceleration was detected.

## Environment Variables

- SQL_SERVER
- SQL_DBNAME
- SQL_USER
- SQL_PASSWORD
- WEB_PORT
- WEB_SERVER_BASE_URI
- ASPNETCORE_ENVIRONMENT

## API Paths

- /api/poi
- /api/healthcheck/poi
- /api/docs/poi
- /swagger/docs/poi

## Build and run the Application

```bash
dotnet restore
dotnet build
dotnet run
```

## Tests

### Running the unit tests

### Running the Integration Test

## References

* [Web API](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api)
* [Unit Testing](https://docs.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test?view=aspnetcore-2.1)
* [Integration Testing](https://docs.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-2.1)
* [Example - How to Debug .NET Core Xunit Tests](https://github.com/nickolasacosta/dotnetcore-xunit-debugging)
* [Logging in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/logging/?view=aspnetcore-2.1&tabs=aspnetcore2x)