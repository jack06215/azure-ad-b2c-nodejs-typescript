import express from "express";
import morgan from "morgan";
import passport from "passport";
import {
    BearerStrategy,
    IBearerStrategyOptionWithRequest,
} from "passport-azure-ad";
import config from "./config";
import { IAuthInfo } from "./types/express";

const options: IBearerStrategyOptionWithRequest = {
    identityMetadata: `https://${config.credentials.tenantName}.b2clogin.com/${config.credentials.tenantName}.onmicrosoft.com/${config.policies.policyName}/${config.metadata.version}/${config.metadata.discovery}`,
    clientID: config.credentials.clientID,
    audience: config.credentials.clientID,
    policyName: config.policies.policyName,
    isB2C: config.settings.isB2C,
    validateIssuer: config.settings.validateIssuer,
    loggingLevel: "info",
    passReqToCallback: true,
};

const bearerStrategy = new BearerStrategy(options, (_, token, done) => {
    // Send user info using the second argument
    done(null, {}, token);
});

const app = express();
app.use(express.json());
// enable CORS (for testing only -remove in production/deployment)
app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(morgan("dev"));
app.use(passport.initialize());
passport.use(bearerStrategy);

// API endpoint, one must present a bearer accessToken to access this endpoint
app.get(
    "/hello",
    passport.authenticate("oauth-bearer", { session: false }),
    (req, res) => {
        const payload: IAuthInfo = { ...req.authInfo };
        console.log("Validated claims: ", payload);

        // Service relies on the name claim.
        res.status(200).json({ name: req.authInfo?.name });
    }
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Listening on port " + port);
});
