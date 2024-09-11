# The Gauntlet

The Gauntlet is a web challenge where we need to solve 10 mini challenges.
![website](website.png)

# Inspect Element

We're looking for something hidden on the page. We use `Inspect Element` to see the HTML source code and see the hidden HTML comment `\hidden9136234145526`.

![inspect_element](inspect_element.png)

# 1. HTTP GET Request Header

We decide to trying going to this page: `https://gauntlet-okntin33tq-ul.a.run.app/hidden9136234145526` and see that we need to set the HTTP Header `wolvsec` to `rocks`.

![Challenge 1](header.png)

We try using `curl` with `-H 'wolvsec: rocks'` for the header and see the HTML comment `/hidden0197452938528`.

![curl](curl.png)

# 2. HTTP OPTIONS REQUEST

We find that we need to use a specific HTTP Method.

![Challenge 2](request.png)

We try using `curl` with `-X OPTIONS` to make an HTTP OPTIONS Request and see the HTML comment `/hidden5823565189534225`.

![options](options.png)

# 3. Query String Parameter

We find that we need to use a query parameter `wolvsec` who's value is `c#+l`.

![Challenge 3](query_string.png)

We try using `curl` with `-G` and `--data-urlencode`. We see the HTML comment `/hidden5912455200155329`.

![URL Encoded Query String](url_encode.png)

# 4. HTTP POST Request

We find that we need to make an HTTP POST Request with the header `Content-Type: application/x-www-form-urlencoded` and the form body `wolvsec=rocks`.

![Challenge 4](post.png)

We try using `curl` with `-H 'Content-Type: application/x-www-form-urlencoded'` for the header, `-F wolvsec=rocks` for the form data, and `--X POST` to make a POST Request. We see the HTML comment `/hidden3964332063935202`.

![URL Encoded Query String](url_encode.png)

# 5. HTTP POST Request

We're looking for something hidden on the page that won't show up if we use `View Source`.

![Challenge 5](page5.png)

We try using `Inspect Element` again and find `/hidden5935562908234559`.

![Inspect Element](inspect2.png)

# 6. URL Redirect

We see that our page has been redirected from `/hidden5935562908234559` to `/hidden5935562908234557`.

![Challenge 6](page6.png)

We use `curl` with `-i --raw` with our first URL `/hidden5935562908234559`.

![Curl For Redirect2](raw.png)

We see that our HTTP RESPONSE has a `location: /hidden5935562908234558` header. We try using `curl` with `--raw` on this new URL `/hidden5935562908234558` and find `/hidden82008753458651496`.

![Curl For Redirect2](curl_again.png)

# 7. Visit 500 Times

We see that we need to visit our page 500 times.

![Challenge 7](page7.png)

We use the `JavaScript` console to set the `cookie-counter` cookie to 500.

```javascript
document.cookie = 'cookie-counter=500'
```

We refresh the page and find `/hidden00127595382036382`

![Challenge 7](solution7.png)

# 8. Visit 500 Times (Harder Edition)

We see that we need to visit our page 500 times again.

![Challenge 8](page8.png)

We check the cookie and find the cookie is now `jwt-cookie-counter=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3VudGVyIjoyfQ.XvkQEJyoYw1flG_ojvYeHqGvbfbixv_C0ZjRKO13dTI`. Additionally, we find a comment in the HTML Source Code: `<!-- HS256 secret is: wolvsec -->`.

We use `https://jwt.io/`. We put the `jwt-cookie-counter` value into the `encoded` text box. On the `Decoded` side we set `counter: 500` in the `payload:data` text box and replace `your-256-bit-secret` with `wolvsec` in `verify signature`. We get `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3VudGVyIjo1MDB9.LW10TYVnD5j3ffWMi_Es3UrusiIyWBum23O6yUUUrrc` and use the `JavaScript` console to update this cookie value.

```javascript
document.cookie='jwt-cookie-counter=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3VudGVyIjo1MDB9.LW10TYVnD5j3ffWMi_Es3UrusiIyWBum23O6yUUUrrc'
```

We refresh the page and find `/hidden83365193635473293`.

![Challenge 8](solution8.png)

# 9. Visit 1000 Times

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

# Flag
> wctf{w3_h0p3_y0u_l34rn3d_s0m3th1ng_4nd_th4t_w3b_c4n_b3_fun_853643}

![Flag](flag.png)
