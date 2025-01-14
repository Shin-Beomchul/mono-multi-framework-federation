# mono-multi-framework-federation


# TL;DR

directory
```
 /apps
    ㄴ hive // 호스트이며, remote-react1,2를 제공받아 랜더링.
    ㄴ remote-react1 // react1
    ㄴ remote-react2 // react2
```

simple
 - ## 2개 터미널에서 실행.
 ```shell
  pnpm build:remotes # 터미널 1
  pnpm preview:remotes # 터미널 1
  pnpm dev:host # 터미널 2
 ```

hot Reload
 - ## 3개 터미널에서 병렬로 실행.
 ```shell 
  pnpm build:remotes:watch # 터미널1
  pnpm preview:remotes # 터미널2
  pnpm dev:host # 터미널3
 ```

# add Dependency
 - pnpm add jwt-decode --filter iaas
 
# execute script   
 - pnpm -filter @hive/rest-client build
 