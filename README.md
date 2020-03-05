A command-line application that dynamically generates a PDF profile from a GitHub username. The application is invoked with the following command:

```sh
node index.js
```

The user is prompted for a favorite color, is used as the background color for cards.

The file is populated with the following:

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

Found
{
    "login": "boboxyz",
    "id": 9119394,
    "node_id": "MDQ6VXNlcjkxMTkzOTQ=",
    "avatar_url": "https://avatars1.githubusercontent.com/u/9119394?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/boboxyz",
    "html_url": "https://github.com/boboxyz",
    "followers_url": "https://api.github.com/users/boboxyz/followers",
    "following_url": "https://api.github.com/users/boboxyz/following{/other_user}",
    "gists_url": "https://api.github.com/users/boboxyz/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/boboxyz/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/boboxyz/subscriptions",
    "organizations_url": "https://api.github.com/users/boboxyz/orgs",
    "repos_url": "https://api.github.com/users/boboxyz/repos",
    "events_url": "https://api.github.com/users/boboxyz/events{/privacy}",
    "received_events_url": "https://api.github.com/users/boboxyz/received_events",
    "type": "User",
    "site_admin": false,
    "name": null,
    "company": null,
    "blog": "",
    "location": null,
    "email": null,
    "hireable": null,
    "bio": null,
    "public_repos": 0,
    "public_gists": 0,
    "followers": 0,
    "following": 0,
    "created_at": "2014-10-09T18:59:14Z",
    "updated_at": "2017-07-31T19:16:27Z"
}

Not Found
{
    "message": "Not Found",
    "documentation_url": "https://developer.github.com/v3/users/#get-a-single-user"
}