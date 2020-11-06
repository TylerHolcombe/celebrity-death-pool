# CelebrityDeathPool

## Google App Engine deployment instructions
1. Log into google cloud console
2a. Make sure the git repo is cloned:
```
git clone https://github.com/TylerHolcombe/celebrity-death-pool.git
```
2b. Run:
```
cd celebrity-death-pool
git pull
docker build . -t gcr.io/celebrity-death-pool-292122/celebrity-death-pool:v1
gcloud docker -- push gcr.io/celebrity-death-pool-292122/celebrity-death-pool:v1
gcloud app deploy --image-url gcr.io/celebrity-death-pool-292122/celebrity-death-pool:v1
```

## Dev deployment instructions
1. Log into remote machine
2. Run:
```
docker build https://github.com/TylerHolcombe/celebrity-death-pool.git -t cdp:latest
docker run -dp 80:8080 cdp:latest
```
