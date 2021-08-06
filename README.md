# num.cl

Easily share your bank account details

Powered using firebase.google.com

## Local Development

The local server uses an emulated database and **does not access the production resurces**. The emulated database gets wiped every time you stop the server, so keep that in mind when developing!

### Requirements

You can either use `Docker` and `Compose` or directly run the application on your machine's dependencies. In that case, you would need `node 14`, `npm` and `firebase-tools` installed globally. The emulator would take care of the rest (the emulator depends on `java`, so you would also need to install something like `default-jre`).

### _Plug and play_

To develop locally, first build the Docker image:

```sh
docker-compose build
```

Then, start the container:

```sh
docker-compose up
```

You can find the application running at `http://localhost:5000`. Note that the rest of the services will also be exposed on `localhost`, for example, the realtime database can be found at `http://localhost:9000`, and the UI can be found at `http://localhost:4000`.

### Running without Docker

To run the application without Docker, you first need to have `firebase-tools` installed globally:

```sh
npm install -g firebase-tools
```

**Note**: To be able to use the `firebase` command, you need to make sure your global `node_modules` are on the PATH. You can run the following command to find your global `node_modules` location to then add to the PATH (if it isn't already there):

```sh
npm list -g | head -1
```

Then, you need to install the functions dependencies. To do this, run:

```sh
npm install --prefix functions
```

Finally, start the emulators!

```sh
firebase emulators:start --project demo-num
```

## Deployment

To deply the application to Firebase, you first need to have `firebase-tools` installed globally:

```sh
npm install -g firebase-tools
```

**Note**: To be able to use the `firebase` command, you need to make sure your global `node_modules` are on the PATH. You can run the following command to find your global `node_modules` location to then add to the PATH (if it isn't already there):

```sh
npm list -g | head -1
```

Then, you need to install the functions dependencies. To do this, run:

```sh
npm install --prefix functions
```

Now, login into your Firebase account:

```sh
firebase login
```

Note that, on CI, you can just leave a token on the `FIREBASE_TOKEN` environmental variable instead of running `firebase login` (you can get a token using `firebase login:ci`).

Finally, you can use the `deploy` command to deploy!

```sh
firebase deploy --project num-cl
```

Here, `num-cl` corresponds to the project name on Firebase.

### Environment variables

Some environmental variables are required for the application to run properly. These variables correspond to:

- `application.host`: The base URL where Num is being hosted (this is useful for callback URLs for verification mails).
- `application.environment`: The environment on which the application is running. This variable is **optional**, and if it doesn't exist, Num will default to think it's running on `development`. It serves to avoid trying to send emails on local development and just print them to te console.
- `sendgrid.api_key`: The API key for Sendgrid to send verification emails.
- `sendgrid.from_email`: The email that sends the verification mails.

To modify an environmental variable on production, you can run the following command:

```sh
firebase functions:config:set --project num-cl my.env.variable='VERY_SECRET_VARIABLE'
```

Here, `num-cl` corresponds to the project name on Firebase.

**Note**: You can notice that there is a `.runtimeconfig.json` file inside the `functions` folder. The application can get its variables from this file! That's how we set the variables for development. But why is it that on production these variables aren't used? That's because of the `firebase.json` file. The `hosting.ignore` value corresponds to an array of file names and patterns that get ignored when the application is running on Firebase. One of these expressions is `**/.*`, which corresponds to any file starting with a dot (`.`) 🎉!
