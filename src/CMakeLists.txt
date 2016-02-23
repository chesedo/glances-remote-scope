# Put the ini, image, and js files in the build directory next
# to the scope .so file so test tools can find them easily.
intltool_merge_translations(
  "data/glances-scope.ini.in"
  "${CMAKE_CURRENT_BINARY_DIR}/${SCOPE_NAME}.ini"
  ALL UTF8
)
intltool_merge_translations(
  "data/glances-scope-settings.ini.in"
  "${CMAKE_CURRENT_BINARY_DIR}/${SCOPE_NAME}-settings.ini"
  ALL UTF8
)

configure_file(
  "data/icon.png"
  "${CMAKE_CURRENT_BINARY_DIR}/icon.png"
  @ONLY COPYONLY
)
configure_file(
  "data/logo.png"
  "${CMAKE_CURRENT_BINARY_DIR}/logo.png"
  @ONLY COPYONLY
)

configure_file(
  "glances-scope.js"
  "${CMAKE_CURRENT_BINARY_DIR}/${SCOPE_NAME}.js"
  @ONLY COPYONLY
)

add_custom_target(
  copy_modules ALL
  COMMAND ${CMAKE_COMMAND} -E create_symlink
    "${CMAKE_CURRENT_SOURCE_DIR}/node_modules"
    "${CMAKE_CURRENT_BINARY_DIR}/node_modules"
)

# Install the scope ini, image, and js files
install(
  FILES
    "${CMAKE_CURRENT_BINARY_DIR}/${SCOPE_NAME}.ini"
    "${CMAKE_CURRENT_BINARY_DIR}/${SCOPE_NAME}-settings.ini"
    "${CMAKE_CURRENT_BINARY_DIR}/icon.png"
    "${CMAKE_CURRENT_BINARY_DIR}/logo.png"
    "${CMAKE_CURRENT_BINARY_DIR}/${SCOPE_NAME}.js"
  DESTINATION
    ${SCOPE_INSTALL_DIR}
)

install(
  DIRECTORY
    "${CMAKE_CURRENT_SOURCE_DIR}/node_modules"
  DESTINATION
    ${SCOPE_INSTALL_DIR}
  USE_SOURCE_PERMISSIONS
)

