# mono-multi-framework-federation

![Preview](./readmeAssets/preview.png)

# TL;DR
- directorys
```
 /apps
    ㄴ hive // host App
    ㄴ remote-react1 // react1
    ㄴ remote-react2 // react2
    ㄴ remote-vue // vue
```

 - how to run
   **Pre-work**: Open three terminals.
 ```shell 
  pnpm build:remotes:watch # run in terminal 1
  pnpm preview:remotes # run in terminal 2
  pnpm dev:host # run in terminal 3
 ```

 # Who is it suitable for?
  - **완전히 독립된 조직들이 하나의 도메인으로 통합되어야 할때**
    app 단위로 독립되어 랜더링 됨. 즉,원격으로 제공받은 n개의 app이 동시에 존재하지 않음을 보장.

 

# add Dependency
 - pnpm add jwt-decode --filter iaas
 
# execute script   
 - pnpm -filter @hive/rest-client build
 