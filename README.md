# matthewmackay.info
matthewmackay.info .net core mvc with react + redux


Be sure to setup appsettings.Development.json for local debugging. Ex:
{
  "Jwt": {
    "SigningSecret": "fasdf33343/eD00eybUGQsy/oyg63FOld/asfd==",
    "ExpiryDuration": 10 // minutess
  },
  "DatabaseSettings": {
    "TestCollectionName": "test",
    "ConnectionString": "mongodb://CONNECTION_STRING_HERE",
    "DatabaseName": "admin"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "System": "Information",
      "Microsoft": "Information"
    }
  }
}
