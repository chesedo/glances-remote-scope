var scopes = require('unity-js-scopes');

// Get data helper
var GlancesData = require('glances-data').GlancesData;

// Get all categories' helpers
var AlertsCategory = require("categories/alerts");
AlertsCategory = new AlertsCategory.AlertsCategory();

var ResourcesCategory = require("categories/resources");
ResourcesCategory = new ResourcesCategory.ResourcesCategory();

var FilesystemsCategory = require("categories/filesystems");
FilesystemsCategory = new FilesystemsCategory.FilesystemsCategory();

var ProcessListCategory = require("categories/process_list");
ProcessListCategory = new ProcessListCategory.ProcessListCategory();

var NetworkCategory = require("categories/network");
NetworkCategory = new NetworkCategory.NetworkCategory();

scopes.self.initialize(
            {}
            ,
            {
                run: function() {
                },
                start: function(scope_id) {
                },
                search: function(canned_query, metadata) {
                    return new scopes.lib.SearchQuery(
                                canned_query,
                                metadata,
                                // Perform search
                                function(search_reply) {
                                    // Get settings and values
                                    var qs = canned_query.query_string();
                                    var dep = canned_query.department_id();
                                    var ip = scopes.self.settings.ip.get_string();
                                    var port = scopes.self.settings.port.get_string();

                                    // Create departments
                                    var rootDepartment = new scopes.lib.Department("", canned_query, "Overview");
                                    var processListDepartment = new scopes.lib.Department("processList", canned_query, "Processes List");
                                    var fsDepartment = new scopes.lib.Department("fs", canned_query, "Filesystems");
                                    var networkDepartment = new scopes.lib.Department("network", canned_query, "Networks");
                                    rootDepartment.set_subdepartments([processListDepartment, fsDepartment, networkDepartment]);

                                    // Exit if details are missing
                                    if (ip === "" || port === "") {
                                        return
                                    }

                                    // Build reply
                                    data = new GlancesData(ip, port, function() {
                                        // Add docker department if needed
                                        if (data.hasDocker()) {
                                            var dockerDepartment = new scopes.lib.Department("docker", canned_query, "Docker");
                                            rootDepartment.add_subdepartment(dockerDepartment);
                                        }
                                        search_reply.register_departments(rootDepartment);

                                        // Check which department is needed
                                        switch (dep) {
                                            case "":
                                                if (qs === "") {
                                                    // Surface mode
                                                    ResourcesCategory.createCategory(search_reply, canned_query);
                                                    AlertsCategory.createCategory(search_reply);
                                                } else {
                                                    // Search mode
                                                    ProcessListCategory.createCategory(search_reply, qs);
                                                    FilesystemsCategory.createCategory(search_reply, qs);
                                                    NetworkCategory.createCategory(search_reply, qs);
                                                }
                                                break;
                                            case "fs":
                                                FilesystemsCategory.createCategory(search_reply, qs);
                                                break;
                                            case "processList":
                                                ProcessListCategory.createCategory(search_reply, qs);
                                                break;
                                            case "network":
                                                NetworkCategory.createCategory(search_reply, qs);
                                                break;
                                            case "docker":
                                        }
                                        search_reply.finished();
                                    });
                                },
                                // Cancelled
                                function() {
                                });
                },
                preview: function(result, action_metadata) {
                    return new scopes.lib.PreviewQuery(
                                result,
                                action_metadata,
                                // Build preview
                                function(preview_reply) {
                                    // Check which category it is coming from
                                    switch (result.get("resultCategory")) {
                                        case "Alerts":
                                            AlertsCategory.createPreview(preview_reply);
                                            break;
                                        case "Resources":
                                            ResourcesCategory.createPreview(preview_reply, result);
                                            break;
                                        case "fs":
                                            FilesystemsCategory.createPreview(preview_reply);
                                            break;
                                        case "processList":
                                            ProcessListCategory.createPreview(preview_reply);
                                            break;
                                        case "network":
                                            NetworkCategory.createPreview(preview_reply);
                                            break;
                                        case "docker":
                                    }

                                    preview_reply.finished();
                                },
                                // Cancelled
                                function() {
                                });
                }
            }
            );
