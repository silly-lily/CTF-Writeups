### The Gauntlet

Can you survive the gauntlet?

10 mini web challenges are all that stand between you and the flag.

---

#### Is there anything hidden on this page?

We look at the HTML source code and see the comment `\hidden9136234145526`.

![inspect_element](inspect_element.png)

---

#### Page 1: This page will yield a secret if you set an "HTTP Request Header" like this: `wolvsec: rocks`

We decide to trying going to this page: `https://gauntlet-okntin33tq-ul.a.run.app/hidden9136234145526` and see that we need to set the HTTP Header `wolvsec` to `rocks`.

![Challenge 1](header.png)

We use `curl` with `-H 'wolvsec: rocks'` for the header:

![curl](curl.png)

---

#### Page 2: This page will yield a secret if you use a certain "HTTP Method".

We find that we need to use a specific HTTP Method.

![Challenge 2](request.png)

We try using `curl` with `-X OPTIONS` to make an HTTP OPTIONS Request:

![options](options.png)

---

#### Page 3: This page will yield a secret if you have a "Query String" parameter named `wolvsec` whose value, as seen by the server is: `c#+1`

We find that we need to use a query parameter `wolvsec` who's value is `c#+l`.

![Challenge 3](query_string.png)

We use `curl` with `-G` and `--data-urlencode`:

![URL Encoded Query String](url_encode.png)

---

#### Page 4: This page will yield a secret if you perform a POST to it with this request header: `Content-Type: application/x-www-form-urlencoded`. The form body needs to look like this: `wolvsec=rocks`.

We find that we need to make an HTTP POST Request with a header and body:

![Challenge 4](post.png)

We use `curl` with `-H 'Content-Type: application/x-www-form-urlencoded'` for the header, `-F wolvsec=rocks` for the form data, and `--X POST` to make a POST Request:

![URL Encoded Query String](url_encode.png)

---

#### Page 5: The secret is ALREADY on this page. View Source won't show it though. How can that be?

We're looking for something hidden on the page that won't show up if we use `View Source`.

![Challenge 5](page5.png)

We try using `Inspect Element`:

![Inspect Element](inspect2.png)

---

#### Page 6: Hmmmm, I'm pretty sure the URL in the address bar is NOT the one you got from Page 5. How could that have happened?

Our page has been redirected from `/hidden5935562908234559` to `/hidden5935562908234557`.

![Challenge 6](page6.png)

We use `curl` with `-i --raw` with our first URL `/hidden5935562908234559`.

![Curl For Redirect2](raw.png)

We see that our HTTP RESPONSE has a `location: /hidden5935562908234558` header. We try using `curl` with `--raw` on this new URL `/hidden5935562908234558` and find `/hidden82008753458651496`.

![Curl For Redirect2](curl_again.png)

---

#### Page 7: If you can visit this page 500 times, a secret will be revealed.

We see that we need to visit our page 500 times.

![Challenge 7](page7.png)

We use the `JavaScript` console to set the `cookie-counter` cookie to 500.

```javascript
document.cookie = 'cookie-counter=500'
```

We refresh the page and find `/hidden00127595382036382`

![Challenge 7](solution7.png)

---

#### Page 8: If you can visit this page 500 times, a secret will be revealed.

We see that we need to visit our page 500 times again.

![Challenge 8](page8.png)

We check the cookie and find the cookie is now `jwt-cookie-counter=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3VudGVyIjoyfQ.XvkQEJyoYw1flG_ojvYeHqGvbfbixv_C0ZjRKO13dTI`. Additionally, we find a comment in the HTML Source Code: `<!-- HS256 secret is: wolvsec -->`.

We use `https://jwt.io/`. We put the `jwt-cookie-counter` value into the `encoded` text box. On the `Decoded` side we set `counter: 500` in the `payload:data` text box and replace `your-256-bit-secret` with `wolvsec` in `verify signature`. We get `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3VudGVyIjo1MDB9.LW10TYVnD5j3ffWMi_Es3UrusiIyWBum23O6yUUUrrc` and use the `JavaScript` console to update this cookie value.

```javascript
document.cookie='jwt-cookie-counter=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3VudGVyIjo1MDB9.LW10TYVnD5j3ffWMi_Es3UrusiIyWBum23O6yUUUrrc'
```

We refresh the page and find `/hidden83365193635473293`.

![Challenge 8](solution8.png)

---

#### Page 9: If you can visit this page {PAGE9_COUNTER_LIMIT} times, a secret will be revealed.

We see that we need to visit our page 1000 times.

![Challenge 9](page9.png)

We use python to send requests to `https://gauntlet-okntin33tq-ul.a.run.app/hidden83365193635473293. We save the cookies after each request and send those saved cookies with the next request. We do this 1000 times.

```Python
import requests

url = 'https://gauntlet-okntin33tq-ul.a.run.app/hidden83365193635473293'

res = requests.get(url)
cookies = res.cookies

cookies = res.cookies
for i in range (0,1000):
  
    res = requests.get(url, cookies=cookies)
    cookies = res.cookies

print(res.text)
```

In our output we find `/flag620873537329327365`.

#### Page 10

![Flag](flag.png)

---

## Flag
> wctf{w3_h0p3_y0u_l34rn3d_s0m3th1ng_4nd_th4t_w3b_c4n_b3_fun_853643}


---