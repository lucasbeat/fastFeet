import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/fastfeet-logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SingIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="FastFeet" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          label="SEU EMAIL"
          placeholder="exemplo@email.com"
        />
        <Input
          name="password"
          type="password"
          label="SUA SENHA"
          placeholder="********"
        />

        <button type="submit">Entrar no sistema</button>
      </Form>
    </>
  );
}
