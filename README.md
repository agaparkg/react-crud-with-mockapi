## CRUD operations project with React, React Router, React Hooks, and Axios.

https://user-images.githubusercontent.com/53021935/127402227-a2f2d4d3-9650-44a8-892d-3bc335fc018f.mov

### This Project has been deployed to Surge.sh

[thinkable-sound.surge.sh](thinkable-sound.surge.sh)

### Here are the steps to deploy an app to Surge.sh

- Deploying an app to Surge is insanely easy, and it’s even free (including a custom domain and SSL).

(This assumes you already have an app created with Create React App)

Install Surge:
`$ npm install -g surge`

- Run the Create React App build:
  `$ cd your-react-project`

`$ npm run build`

- Switch into the build directory:
  `$ cd build`

Run "surge", and follow the prompts. All it needs is an email and a password, and you can optionally specify a different domain name.
`$ surge`
`$ echo "thinkable-sound.surge.sh" > CNAME` ---> this will make sure that you will get the same domain name in every update

- Go to the URL it prints out. For instance, [thinkable-sound.surge.sh](thinkable-sound.surge.sh)
