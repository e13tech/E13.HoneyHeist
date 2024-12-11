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
    .WithExternalHttpEndpoints();

//builder.AddProject<Projects.ExampleProject>()
//       .WithReference(api)
//       .WaitFor(api);

builder.Build().Run();
