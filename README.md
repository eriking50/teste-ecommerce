# Teste Backend Ecommerce

Projeto feito na versão do Node 18.20.7

### Endpoints:

[POST] /login:
Retorna um token de exemplo para simulação de autorização nas rotas


[POST] /cart/:cartId/cart-item/:itemId
Cria um Customer

```json
{
  "name": "João",
  "email": "email@email.com"
}
```


[POST] /cart/open:
Cria ou retorna o carrinho atual do usuário.

```json
{
  "customerId": "id_exemplo_customer"
}

```


[POST] /cart/:cartId/checkout:
Finaliza uma compra passando o tipo de pagamento, para o tipo card é possivel simular passando no argumento "cardSimulation" o resultado que quer simular.

```json
{
  "paymentType": "card",
  "cardSimulation": "success"
}

```


[POST] /cart/:cartId/cart-item/:itemId
Adiciona um item ao carrinho de compras

```json
{
  "productId": "id_exemplo_produto",
  "type": "subscription",
  "quantity": 1,
  "price": 10,
  "periodicity": "yearly"
}
```


[DELETE] /cart/:cartId/cart-item/:itemId
Remove um item do carrinho de compras

### Produtos:

Produtos cadatrados via migration:

```text
id                                    Valor Nome
75d4879b-5321-43c4-8e6c-699497801ddd	10	  Assinatura Bronze
7b17db55-5381-4099-92c4-2cd36d99da7b	25	  Assinatura Prata
7b65e9f1-5257-4352-bcdf-60722c0313cc	50	  Assinatura Ouro
ce215b7c-eb16-4c82-9335-e2a545511017	100	  Assinatura Diamante

```


### Scripts:

Para rodar a aplicação faça os seguintes passos em ordem:

- Para instalar as libs:

```sh
npm install
```

- Para subir o banco de dados: 

```sh
docker compose up
```

- Para rodar as migrations:

```sh
npm run typeorm migration:run -- -d src/infrastructure/repository/DataSource.ts
```

- Adicione as variáveis de ambiente, use o arquivo env.example como base

- Para rodar o servidor:

```sh
npm run start:dev 
```


### Webhook

Para simular o webhook chame o endpoint abaixo com os dados necessários.

[POST] /webhooks/payment

```json
{
  "event": "payment_success",
  "transactionId": "id_exemplo_transaction",
  "orderId": "id_exemplo_order",
  "customerId": "id_exemplo_customer",
  "amount": 300.00,
  "currency": "BRL",
  "paymentMethod": "boleto",
  "timestamp": "2025-10-09T15:10:00Z",
  "metadata": {
    "cartId": "id_exemplo_cart",
    "subscriptionIds": ["id_exemplo_subscription", "id_exemplo_subscription2"]
  }
}
```


### Motor de Cobrança

Para gerar um novo período de uma assinatura chame o endpint passando uma assinatura existente.

[POST] /billing-engine/:subscriptionId