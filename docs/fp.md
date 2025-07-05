# 関数型っぽいWebフロントエンド

## 要素

### 内部ロジック

- 内部ロジック用データ構造
- UI用データ構造
- 関数

```ts
const DomainErrorNameMap = {
  ValidationError: 'ValidationError',
  BadRequestError: 'BadRequestError',
  NotFoundError: 'NotFoundError',
  InternalServerError: 'InternalServerError',
  UnexpectedError: 'UnexpectedError'
}

type DomainErrorName = keyof typeof DomainErrorNameMap

type ValidationError = {
  __type: typeof DomainErrorNameMap.ValidationError
  field: string
  message: string
}

const validationError = (field: string, message: string): ValidationError => {
  return {
    __type: DomainErrorNameMap.ValidationError,
    field,
    message
  }
}

type UnexpectedError = {
  __type: typeof DomainErrorNameMap.UnexpectedError
  message: string
}

export type DomainError = 
  | ValidationError
  | UnexpectedError
```

```ts
// Internal logic
type Email = string

type User = {
  id: string
  name: string
  email: Email
}

export const email = (value: string): Result<Email, ValidationError[]> => {
  if (!emailRegexp.test(value)) {
    return err([validationError('email', 'email should be in valid format')])
  }
  return ok(value)
}

export const user = (obj: { name: string, email: string }): Result<User, ValidationError[]> => {
  const validationErrors = []

  if (obj.name.trim() === '') {
    validationErrors.push(
      validationError('name', 'name must not be empty')
    )
  }

  const emailResult = email(obj.email)
  if (!emailResult.ok) {
    validationErrors.push(
      ...emailResult.error
    )
  }

  if (validationErrors.length > 0) {
    return err(validationErrors)
  }

  return ok({
    id: randomString(),
    name: obj.name,
    email: emailResult.value
  })
}
```

```ts
// Logic for UI
type Busy = {
  isBusy: boolean
}

type WithBusy<UIData> = UIData & Busy

const busy = <UIData>(data: UIData): WithBusy<UIData> => {
  return {
    ...data,
    isBusy: true
  }
}

const idle = <UIData>(data: UIData): WithBusy<UIData> => {
  return {
    ...data,
    isBusy: false
  }
}

type UserUIProps = Pick<Required<User>, 'name' | 'email'> & Pick<Partial<User>, 'id'>

type UserUIData = WithBusy<{
  userInputs: UserUIProps,
  errorMessages: UserUIProps
}>

const userUIData = (userUIProps: UserUIProps): UserUIData => {
  const userResult = user(userUIProps)

  return {
    userInputs: { ...userUIProps },
    errorMessages: mapPropsToErrorMessages(userResult)
  }
}

const saveUser = async (userUIProps: UserUIProps, saveUserApi: UserApiEnv.saveUser, handleError: (error: DomainError) => Promise<void>): Promise<void> => {
  userUIData(userUIProps)
    .asResultPromise()
    .map(saveUser)
    .match({
      ok: () => {}
      err: handleError
    })
}
```

### 外部API

- APIコール
- エラーハンドリング
- マッパー

```ts
const getUser = async (id: string): Promise<Result<User, DomainError>> => {
  try {
    const response = await fetch(`https://example.com/user/${id}`)
    if (!response.ok) {
      return err(mapApiErrorToDomainError(response.status))
    }
    const apiUser = await response.json()
    const mappedUser = mapApiUserToUser(apiUser)
    return ok(mappedUser)
  } catch (error) {
    return err(mapApiErrorToDomainError(error))
  }
}
```

### 統合 (ロジック)

- 典型的なフロー
  - 入力
    - バリデーション
    - エラーハンドリング
  - 状態の更新
    - コンピューテッドな値
    - 関連の値
  - APIコール
    - APIクライアント
    - エラーハンドリング
    - マッパー
  - 結果

### 統合 (UI)

```ts
// <script setup lang="ts">
import { ref } from 'vue'

const userUIDataRef = ref<UserUIData>(userUIData({
  name: '',
  email: '',
}))

// No need to define like here. We can set same function in template
const handleUpdateName = (name: string): UserUIData => {
  userUIDataRef.value = userUIData({
    ...userUIDataRef.value,
    name
  })
}
```
