const config = {
  "credentials": {
    "tenantName": "jackazureadb2c",
    "clientID": "bf984731-3fff-4574-bd34-31ac00661101"
  },
  "policies": {
    "policyName": "B2C_1_signupsignin1"
  },
  "resource": {
    "scope": ["tasks.read"]
  },
  "metadata": {
    "authority": "login.microsoftonline.com",
    "discovery": ".well-known/openid-configuration",
    "version": "v2.0"
  },
  "settings": {
    "isB2C": true,
    "validateIssuer": true,
    "passReqToCallback": true,
  }
}

export default config;
