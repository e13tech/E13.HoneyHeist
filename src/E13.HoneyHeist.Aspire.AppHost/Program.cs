using Aspire.Hosting;
using Microsoft.Extensions.Hosting;
using static System.Runtime.InteropServices.JavaScript.JSType;

var builder = DistributedApplication.CreateBuilder(args);

// Determine if running in local development environment
bool isDevelopment = builder.Environment.IsDevelopment();

var storage = builder.AddAzureStorage("storage");

if (isDevelopment)
{
    storage.RunAsEmulator();
}

var blobs = storage.AddBlobs("blobs");

var api = builder
    .AddAzureFunctionsProject<Projects.E13_HoneyHeist_Api>("api")
    .WithHostStorage(storage)
    .WithReference(blobs)
    .WithExternalHttpEndpoints()
    ;

var web = builder.AddNpmApp("web", "../E13.HoneyHeist.Web")
    .WithEnvironment("BROWSER", "none") // Disable opening browser on npm start
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints();

// Retrieve the HTTP endpoint for the 'web' service
var webEndpoint = web.GetEndpoint("http");

// Retrieve the HTTP endpoint for the 'api' service
var apiEndpoint = api.GetEndpoint("http");

var swa = builder.AddSwaEmulator("swa")
    .WithArgs(
        "--app-devserver-url", webEndpoint,
        "--api-devserver-url", apiEndpoint)
    .WithReference(api)
    .WithReference(web);


//builder.AddProject<Projects.ExampleProject>()
//       .WithReference(api)
//       .WaitFor(api);

builder.Build().Run();
