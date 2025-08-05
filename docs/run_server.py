from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl
import socketserver
import os

# https://qiita.com/00b012deb7c8/items/6d4e93ac10de24cf7c79
# https://qiita.com/relu/items/3461753e3886072349c7

#server_address = ('localhost', 8000)
#httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)

'''
class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.send_header('Custom-Header', 'MyValue')
        self.end_headers()
#        self.wfile.write(b"<html><body><h1>Hello, HTTPS!</h1></body></html>")
    def do_POST(self):
        self.do_GET() # POSTでもGETと同じ処理を行う場合
Handler = MyHandler
httpd = socketserver.TCPServer(('localhost', 8000), Handler)
'''

class CORSRequestHandler (SimpleHTTPRequestHandler):
    def end_headers (self):
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)

httpd = socketserver.TCPServer(('localhost', 8000), CORSRequestHandler )

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
