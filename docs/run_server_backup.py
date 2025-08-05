from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl

server_address = ('localhost', 8000)
httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)

context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.load_cert_chain(certfile='cert.pem', keyfile='key.pem')

httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

print("Serving HTTPS on https://localhost:8000")
httpd.serve_forever()

'''
import ssl
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 443
CERTFILE = "./localhost.pem"

Handler = SimpleHTTPRequestHandler

context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.load_cert_chain(CERTFILE)

with HTTPServer(("", PORT), Handler) as httpd:
    print("serving at address", httpd.server_address, "using cert file", CERTFILE)
    httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
    httpd.serve_forever()
'''
