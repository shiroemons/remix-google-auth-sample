import type { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node'
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from '~/services/auth.server'

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request)
  if (user) { // ログイン済みのユーザーはサクセスページにリダイレクト
    return redirect('/success')
  }
  return {}
};

export default function Login() {
  return (
    <Form action="/auth/google" method="post">
      <button>Login with Google</button>
    </Form>
  )
}