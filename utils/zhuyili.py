import requests, signal, sys, time

url = 'http://192.144.131.178:3000'
# url = 'http://127.0.0.1:3000'
now = time.time()

def record(signum, frame):
    mseconds = int((time.time() - now) * 1000)
    rurl = '/'.join([url, 'insert', 'mxf', '%d' % (now*1000), '%d' % mseconds])
    print rurl
    r = requests.get(rurl)
    print r.text

signal.signal(signal.SIGINT, record)

time.sleep(86400)
