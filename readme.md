# Diigo Proxy

> Turn Diigo API calls into an RSS feed

- Use whatever querystring arguments they document in their API
- Set your username and password as the basic auth credentials
- OR: Set a Now secret called `authorization` with your base64 encoded basic auth string
- Make calls to this endpoint hosted on Ziet Now: https://diigo-proxy.karllhughes.now.sh

## To deploy

```
# Local
now dev

# Prod
now
```
