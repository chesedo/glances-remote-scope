var scopes = require('unity-js-scopes');


scopes.self.initialize(
            {}
            ,
            {
                run: function() {
                    console.log('Running...')
                },
                start: function(scope_id) {
                    console.log('Starting scope id: '
                                + scope_id
                                + ', '
                                + scopes.self.scope_directory)
                },
                search: function(canned_query, metadata) {
                    return new scopes.lib.SearchQuery(
                                canned_query,
                                metadata,
                                // run
                                function(search_reply) {
                                    var qs = canned_query.query_string();

                                },
                                // cancelled
                                function() {
                                });
                },
                preview: function(result, action_metadata) {
                    return new scopes.lib.PreviewQuery(
                                result,
                                action_metadata,
                                // run
                                function(preview_reply) {
                                    var layout1col = new scopes.lib.ColumnLayout(1);
                                    var layout2col = new scopes.lib.ColumnLayout(2);



                                    var header = new scopes.lib.PreviewWidget("header", "header");
                                    header.add_attribute_mapping("title", "title");


                                    preview_reply.finished();
                                },
                                // cancelled
                                function() {
                                });
                }
            }
            );

