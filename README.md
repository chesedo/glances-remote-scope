# Glances Remote Scope
This is an Ubuntu scope that allows you to monitor a remote machine (like a home server) using [Glances](https://github.com/nicolargo/glances). You will need to install Glances on the remote machine and then start it for remote connections with `glances -w`.

The IP (or DNS) and port for the machine should then be entered it the scope's settings.

## Surface mode
This is the mode that is accessible as the overview department or when no searches are entered. It displays the following:
- Total **CPU** used percent with all its details in the preview
- Used **Memory** percent with all its details in preview
- Used **Swap** percent, also with its details in preview
- Total current **Disk IO** with a breakdown of all disks in its preview
- Total current **Network IO**. Clicking it takes you to the network department
- Number of running **Docker** containers with it taking you to the Docker department - shows if you have Docker running
- Any **Alerts** that might be present with its min, max and mean in preview

## Other Departments
They allow a further breakdown and can all be searched.
- **Processes List** for finding details of a process
- **Filesystems** listing all mounted filesystems
- **Network** with all network interfaces
- **Docker** listing all running containers - if Docker is running

## Screenshots
![Overview](/src/data/screenshot.png?raw=true "Overview Department")
![Searching](/src/data/screenshots/searching.png?raw=true "Performing a search")
![Process Preview](/src/data/screenshots/process_preview.png?raw=true "Process Preview")
![Filesystem Department](/src/data/screenshots/filesystems_category.png?raw=true "Filesystem Department")
![Filesystem Preview](/src/data/screenshots/filesystems_preview.png?raw=true "Filesystem Preview")
![Docker Department](/src/data/screenshots/docker_category.png?raw=true "Docker Department")
![Docker Preview](/src/data/screenshots/docker_preview.png?raw=true "Docker Preview")

## Meaning of those small colored images
They appear when the given item has gone over a limit set in the Glances config:
- **Red** for critical limits/alert
- **Orange** for warning ones
- And **yellow** for careful ones

## ToDo
- Expand on the details shown in the Docker department (like network details, diskio, etc)
- Getting to understand and show some of Alert's missing details
- Adding a raid department
- Investigate if querying only the needed data (multiple requests) will be better than quering all in one request (has some wasted traffic)
- Move the query for the limits to the scopes start function - cut down on requests
- Add missing limits checks
