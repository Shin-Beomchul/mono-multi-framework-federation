function RootPage() {
  return (
    <div>
      <p>
        root의 권한을 가진 사용자만 접근 가능합니다. 인가정보에 god 역할을
        추가해 주세요.
      </p>
      <p>Only users with root authority can access.</p>
    </div>
  )
}

export default RootPage
