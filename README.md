# Github Profile Generator
A command-line application that dynamically generates a PDF profile from a GitHub username. The application is invoked with the following command:

# Repos used
fs 
inquirer 
axios
pdf

# Input
1. favorite color
2. name of GitHub user
3. File name. If left empty it is the GitHub user name.

# Output
A pdf file that is written to the folder Output.
The file contents is 
* Profile image
* User name
* Links to the following:
  * User location via Google Maps
  * User GitHub profile
  * User blog
* User bio
* Number of public repositories
* Number of followers
* Number of GitHub stars
* Number of users following

