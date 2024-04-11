import type { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node'
import { redirect, json } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react'
import { authenticator, AuthUserType } from '~/services/auth.server'

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request)
  if (!user) { // 未ログインのユーザーはログインページにリダイレクト
    return redirect('/login')
  }
  return json<LoaderData>({
    user
  })
};

type LoaderData = {
  user: AuthUserType
}

export default function SuccessIndex() {
  const { user } = useLoaderData() as LoaderData;

  return (
    <>
      <h1>Hello {user.name}さん</h1>
      <img src={user.image} alt={user.name} />
      <div>ログイン成功しました。</div>
      <div>
        <form action="/logout" method="post">
          <button type="submit">ログアウト</button>
        </form>
      </div>
    </>
  );
}