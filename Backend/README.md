## Backend 
Backend application used to manage different doc-nodes instances.

#### Set up
To start the backend application in developer mode:
1. Install node modules
2. Build the Fronted application (necessary to have the GUI, follow the instruction on Frontend section)
3. Create a config file `config.json`
4. Start the server

```
# move to Backend folder
cd Backend

# install dependencies
yarn install

# start server
yarn start
```

#### Build 
To build the production version of the backend:
1. Install node modules
2. Build the Frontend application (necessary to have the GUI, follow the instruction on Frontend section)
3. Create a config file `config.json`
4. Build the backend
```
# move to Backend folder
cd Backend

# install dependencies
yarn install

# build server
yarn build
```
After having builded the app, in the folder `<root>/Backend/build` will be generated a `index.js` file that can be run executing: `node index.js`

#### Config file
The config file (`config.json`) is located in `<root>/Backend/config.json` and should contain the following configurations:

- `docNodesMethod` with allowed value one of these ["static", "json", "consul"] (consul not yet implemented)
- `docNodesList` array of doc-node configuration, each doc-node configuration should contain (id, ip and port)

Here an example:
```json
{
  "docNodesMethod": "json",
  "docNodesList": [
    {
      "id": 1,
      "ip": "127.0.0.1",
      "port": 5555
    }
  ]
}
```

#### Run on docker
Firstly, build the image:
```
# move to Backend folder
cd Backend

# build docker image
docker build -t delorean-up .
```
Secondly, run the container:
```
docker run -d --name delorean-up -p 3000:3000 delorean-up
```
