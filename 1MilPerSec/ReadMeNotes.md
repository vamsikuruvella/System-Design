# Autocannon

## Command

```bash
autocannon -m GET -c 20 -d 20 -p 2 -w 1 http://localhost:3001/simple


| Flag     | Meaning                              | Value                                 |
| -------- | ------------------------------------ | ------------------------------------- |
| `-m GET` | HTTP method to use                   | `GET`                                 |
| `-c 20`  | Number of concurrent TCP connections | `20 clients`                          |
| `-d 20`  | Test duration                        | `20 seconds`                          |
| `-p 2`   | HTTP pipelining factor               | `2 requests in flight per connection` |
| `-w 1`   | Worker processes generating load     | `1 worker`                            |


