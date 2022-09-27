[1mdiff --git a/package-lock.json b/package-lock.json[m
[1mindex a058f43..38973d5 100644[m
[1m--- a/package-lock.json[m
[1m+++ b/package-lock.json[m
[36m@@ -1,8 +1,8449 @@[m
 {[m
   "name": "cj-backend",[m
   "version": "1.0.0",[m
[31m-  "lockfileVersion": 1,[m
[32m+[m[32m  "lockfileVersion": 2,[m
   "requires": true,[m
[32m+[m[32m  "packages": {[m
[32m+[m[32m    "": {[m
[32m+[m[32m      "name": "cj-backend",[m
[32m+[m[32m      "version": "1.0.0",[m
[32m+[m[32m      "hasInstallScript": true,[m
[32m+[m[32m      "license": "ISC",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "nodemon": "^2.0.7",[m
[32m+[m[32m        "jsonwebtoken": "^8.5.1",[m
[32m+[m[32m        "html-docx-js": "^0.3.1",[m
[32m+[m[32m        "@graphql-tools/load": "^7.4.1",[m
[32m+[m[32m        "lodash.merge": "^4.6.2",[m
[32m+[m[32m        "graphql-upload": "^11.0.0",[m
[32m+[m[32m        "lodash": "^4.17.21",[m
[32m+[m[32m        "graphql-tools": "^8.2.0",[m
[32m+[m[32m        "forever": "^4.0.1",[m
[32m+[m[32m        "bcryptjs": "^2.4.3",[m
[32m+[m[32m        "apollo-server-express": "^3.1.2",[m
[32m+[m[32m        "graphql": "^15.5.1",[m
[32m+[m[32m        "@graphql-tools/graphql-file-loader": "^7.3.3",[m
[32m+[m[32m        "graphql-iso-date": "^3.6.1",[m
[32m+[m[32m        "prisma": "^2.27.0-dev.57",[m
[32m+[m[32m        "express": "^4.17.1",[m
[32m+[m[32m        "@prisma/client": "^2.27.0-dev.57",[m
[32m+[m[32m        "@graphql-tools/load-files": "^6.5.2",[m
[32m+[m[32m        "latest": "^0.2.0",[m
[32m+[m[32m        "http-server": "^0.12.3",[m
[32m+[m[32m        "docx": "^6.0.3",[m
[32m+[m[32m        "fs-capacitor": "^6.2.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "devDependencies": {[m
[32m+[m[32m        "@prisma/cli": "^2.15.0",[m
[32m+[m[32m        "@types/node": "^14.14.22",[m
[32m+[m[32m        "prettier": "2.2.1",[m
[32m+[m[32m        "ts-node": "^9.1.1",[m
[32m+[m[32m        "typescript": "^4.1.3"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/read-installed/node_modules/util-extend": {[m
[32m+[m[32m      "version": "1.0.1",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "MIT"[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/extglob/node_modules/define-property": {[m
[32m+[m[32m      "version": "1.0.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",[m
[32m+[m[32m      "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "is-descriptor": "^1.0.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/columnify/node_modules/wcwidth/node_modules/defaults": {[m
[32m+[m[32m      "version": "1.0.3",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "clone": "^1.0.2"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/string-width/node_modules/is-fullwidth-code-point": {[m
[32m+[m[32m      "version": "3.0.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=8"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@protobufjs/path": {[m
[32m+[m[32m      "version": "1.1.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@protobufjs/path/-/path-1.1.2.tgz",[m
[32m+[m[32m      "integrity": "sha1-bMKyDFya1q0NzP0hynZz2Nf79o0="[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/mkdirp/node_modules/minimist": {[m
[32m+[m[32m      "version": "0.0.8",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "MIT"[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/url-parse-lax": {[m
[32m+[m[32m      "version": "3.0.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/url-parse-lax/-/url-parse-lax-3.0.0.tgz",[m
[32m+[m[32m      "integrity": "sha1-FrXK/Afb42dsGxmZF3gj1lA6yww=",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "prepend-http": "^2.0.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=4"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/request/node_modules/http-signature": {[m
[32m+[m[32m      "version": "1.1.1",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "assert-plus": "^0.2.0",[m
[32m+[m[32m        "jsprim": "^1.2.2",[m
[32m+[m[32m        "sshpk": "^1.7.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.8",[m
[32m+[m[32m        "npm": ">=1.3.7"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/es-to-primitive": {[m
[32m+[m[32m      "version": "1.2.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/es-to-primitive/-/es-to-primitive-1.2.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-QCOllgZJtaUo9miYBcLChTUaHNjJF3PYs1VidD7AwiEj1kYxKeQTctLAezAOH5ZKRH0g2IgPn6KwB4IT8iRpvA==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "is-callable": "^1.1.4",[m
[32m+[m[32m        "is-date-object": "^1.0.1",[m
[32m+[m[32m        "is-symbol": "^1.0.2"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.4"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/sponsors/ljharb"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/request/node_modules/http-signature/node_modules/sshpk/node_modules/ecc-jsbn": {[m
[32m+[m[32m      "version": "0.1.1",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "optional": true,[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "jsbn": "~0.1.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/define-property/node_modules/is-descriptor": {[m
[32m+[m[32m      "version": "1.0.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "is-accessor-descriptor": "^1.0.0",[m
[32m+[m[32m        "is-data-descriptor": "^1.0.0",[m
[32m+[m[32m        "kind-of": "^6.0.2"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/jwa": {[m
[32m+[m[32m      "version": "1.4.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/jwa/-/jwa-1.4.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-qiLX/xhEEFKUAJ6FiBMbes3w9ATzyk5W7Hvzpa/SLYdxNtng+gcurvrI7TbACjIXlsJyr05/S1oUhZrc63evQA==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "buffer-equal-constant-time": "1.0.1",[m
[32m+[m[32m        "ecdsa-sig-formatter": "1.0.11",[m
[32m+[m[32m        "safe-buffer": "^5.0.1"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/npmlog/node_modules/gauge": {[m
[32m+[m[32m      "version": "1.2.7",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "ISC",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "ansi": "^0.3.0",[m
[32m+[m[32m        "has-unicode": "^2.0.0",[m
[32m+[m[32m        "lodash.pad": "^4.1.0",[m
[32m+[m[32m        "lodash.padend": "^4.1.0",[m
[32m+[m[32m        "lodash.padstart": "^4.1.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/event-stream": {[m
[32m+[m[32m      "version": "3.3.4",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/event-stream/-/event-stream-3.3.4.tgz",[m
[32m+[m[32m      "integrity": "sha1-SrTJoPWlTbkzi0w02Gv86PSzVXE=",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "duplexer": "~0.1.1",[m
[32m+[m[32m        "from": "~0",[m
[32m+[m[32m        "map-stream": "~0.1.0",[m
[32m+[m[32m        "pause-stream": "0.0.11",[m
[32m+[m[32m        "split": "0.3",[m
[32m+[m[32m        "stream-combiner": "~0.0.4",[m
[32m+[m[32m        "through": "~2.3.1"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/is-typed-array/node_modules/es-abstract": {[m
[32m+[m[32m      "version": "1.18.5",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.18.5.tgz",[m
[32m+[m[32m      "integrity": "sha512-DDggyJLoS91CkJjgauM5c0yZMjiD1uK3KcaCeAmffGwZ+ODWzOkPN4QwRbsK5DOFf06fywmyLci3ZD8jLGhVYA==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "object-keys": "^1.1.1",[m
[32m+[m[32m        "internal-slot": "^1.0.3",[m
[32m+[m[32m        "function-bind": "^1.1.1",[m
[32m+[m[32m        "es-to-primitive": "^1.2.1",[m
[32m+[m[32m        "get-intrinsic": "^1.1.1",[m
[32m+[m[32m        "is-callable": "^1.2.3",[m
[32m+[m[32m        "string.prototype.trimend": "^1.0.4",[m
[32m+[m[32m        "object.assign": "^4.1.2",[m
[32m+[m[32m        "is-regex": "^1.1.3",[m
[32m+[m[32m        "has-symbols": "^1.0.2",[m
[32m+[m[32m        "unbox-primitive": "^1.0.1",[m
[32m+[m[32m        "is-string": "^1.0.6",[m
[32m+[m[32m        "call-bind": "^1.0.2",[m
[32m+[m[32m        "object-inspect": "^1.11.0",[m
[32m+[m[32m        "has": "^1.0.3",[m
[32m+[m[32m        "string.prototype.trimstart": "^1.0.4",[m
[32m+[m[32m        "is-negative-zero": "^2.0.1"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.4"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/sponsors/ljharb"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/readable-stream/node_modules/buffer-shims": {[m
[32m+[m[32m      "version": "1.0.0",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "MIT"[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/fs-write-stream-atomic": {[m
[32m+[m[32m      "version": "1.0.8",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "ISC",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "graceful-fs": "^4.1.2",[m
[32m+[m[32m        "iferr": "^0.1.5",[m
[32m+[m[32m        "imurmurhash": "^0.1.4",[m
[32m+[m[32m        "readable-stream": "1 || 2"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/portfinder/node_modules/debug": {[m
[32m+[m[32m      "version": "3.2.7",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.7.tgz",[m
[32m+[m[32m      "integrity": "sha512-CFjzYYAi4ThfiQvizrFQevTTXHtnCqWfe7x1AhgEscTz6ZbLbfoLRLPugTQyBth6f8ZERVUSyWHFD/7Wu4t1XQ==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "ms": "^2.1.1"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/fstream-npm/node_modules/fstream-ignore": {[m
[32m+[m[32m      "version": "1.0.5",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "ISC",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "fstream": "^1.0.0",[m
[32m+[m[32m        "inherits": "2",[m
[32m+[m[32m        "minimatch": "^3.0.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/internal-slot": {[m
[32m+[m[32m      "version": "1.0.3",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/internal-slot/-/internal-slot-1.0.3.tgz",[m
[32m+[m[32m      "integrity": "sha512-O0DB1JC/sPyZl7cIo78n5dR7eUSwwpYPiXRhTzNxZVAMUuB8vlnRFyLxdrVToks6XPLVnFfbzaVd5WLjhgg+vA==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "get-intrinsic": "^1.1.0",[m
[32m+[m[32m        "has": "^1.0.3",[m
[32m+[m[32m        "side-channel": "^1.0.4"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.4"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/registry-auth-token": {[m
[32m+[m[32m      "version": "4.2.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/registry-auth-token/-/registry-auth-token-4.2.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-6gkSb4U6aWJB4SF2ZvLb76yCBjcvufXBqvvEx1HbmKPkutswjW1xNVRY0+daljIYRbogN7O0etYSlbiaEQyMyw==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "rc": "^1.2.8"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=6.0.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/is-obj": {[m
[32m+[m[32m      "version": "2.0.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/is-obj/-/is-obj-2.0.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-drqDG3cbczxxEJRoOXcOjtdp1J/lyp1mNn0xaznRs8+muBhgQcrnbspox5X5fOw0HnMnbfDzvnEMEtqDEJEo8w==",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=8"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/director": {[m
[32m+[m[32m      "version": "1.2.7",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/director/-/director-1.2.7.tgz",[m
[32m+[m[32m      "integrity": "sha1-v9N0EHX9f7GlsuE2WMX0vsd3NvM=",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.8.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/sha/node_modules/readable-stream": {[m
[32m+[m[32m      "version": "2.0.2",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "core-util-is": "~1.0.0",[m
[32m+[m[32m        "inherits": "~2.0.1",[m
[32m+[m[32m        "isarray": "0.0.1",[m
[32m+[m[32m        "process-nextick-args": "~1.0.0",[m
[32m+[m[32m        "string_decoder": "~0.10.x",[m
[32m+[m[32m        "util-deprecate": "~1.0.1"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/remove-trailing-separator": {[m
[32m+[m[32m      "version": "1.1.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/remove-trailing-separator/-/remove-trailing-separator-1.1.0.tgz",[m
[32m+[m[32m      "integrity": "sha1-wkvOKig62tW8P1jg1IJJuSN52O8="[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/unpipe": {[m
[32m+[m[32m      "version": "1.0.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",[m
[32m+[m[32m      "integrity": "sha1-sr9O6FFKrmFltIF4KdIbLvSZBOw=",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.8"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/resolve-from": {[m
[32m+[m[32m      "version": "5.0.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-5.0.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-qYg9KP24dD5qka9J47d0aVky0N+b4fTU89LN9iDnjB5waksiC49rvMB0PrUJQGoTmH50XPiqOvAjDfaijGxYZw==",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=8"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/apollo-server-express": {[m
[32m+[m[32m      "version": "3.1.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/apollo-server-express/-/apollo-server-express-3.1.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-GeeQlFjFqugiGfLApBNmgLtyDXGVqacLdGhBccn7GQaxzpJ9YSsREUsoN+Fze6RVQ4/Igaq3QoNgBhrahXwBBQ==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@types/accepts": "^1.3.5",[m
[32m+[m[32m        "@types/body-parser": "1.19.1",[m
[32m+[m[32m        "@types/cors": "2.8.12",[m
[32m+[m[32m        "@types/express": "4.17.13",[m
[32m+[m[32m        "@types/express-serve-static-core": "4.17.24",[m
[32m+[m[32m        "accepts": "^1.3.5",[m
[32m+[m[32m        "apollo-server-core": "^3.1.2",[m
[32m+[m[32m        "apollo-server-types": "^3.1.1",[m
[32m+[m[32m        "body-parser": "^1.19.0",[m
[32m+[m[32m        "cors": "^2.8.5",[m
[32m+[m[32m        "parseurl": "^1.3.3"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=12.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "express": "^4.17.1",[m
[32m+[m[32m        "graphql": "^15.3.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/read-installed/node_modules/debuglog": {[m
[32m+[m[32m      "version": "1.0.1",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": "*"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/apollo-datasource": {[m
[32m+[m[32m      "version": "3.0.3",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/apollo-datasource/-/apollo-datasource-3.0.3.tgz",[m
[32m+[m[32m      "integrity": "sha512-oboGz50DbGW6LNaNvB/bpJRypXvYFE1SRO5VxYSUnkz1P7TDcemWfJLRjNnfxCIMVyd0hmmwrmSaGKPQZvmT9Q==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "apollo-server-caching": "^3.0.1",[m
[32m+[m[32m        "apollo-server-env": "^4.0.3"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=12.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/is-weakset": {[m
[32m+[m[32m      "version": "2.0.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/is-weakset/-/is-weakset-2.0.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-pi4vhbhVHGLxohUw7PhGsueT4vRGFoXhP7+RGN0jKIv9+8PWYCQTqtADngrxOm2g46hoH0+g8uZZBzMrvVGDmw==",[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/sponsors/ljharb"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/make-dir": {[m
[32m+[m[32m      "version": "3.1.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/make-dir/-/make-dir-3.1.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-g3FeP20LNwhALb/6Cz6Dd4F2ngze0jz7tbzrD2wAV+o9FeNHe4rL+yK2md0J/fiSf1sa1ADhXqi5+oVwOM/eGw==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "semver": "^6.0.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=8"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/sponsors/sindresorhus"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/is-typed-array/node_modules/string.prototype.trimstart": {[m
[32m+[m[32m      "version": "1.0.4",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/string.prototype.trimstart/-/string.prototype.trimstart-1.0.4.tgz",[m
[32m+[m[32m      "integrity": "sha512-jh6e984OBfvxS50tdY2nRZnoC5/mLFKOREQfw8t5yytkoUsJRNxvI/E39qu1sD0OtWI3OC0XgKSmcWwziwYuZw==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "call-bind": "^1.0.2",[m
[32m+[m[32m        "define-properties": "^1.1.3"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/sponsors/ljharb"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/is-path-inside": {[m
[32m+[m[32m      "version": "3.0.3",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/is-path-inside/-/is-path-inside-3.0.3.tgz",[m
[32m+[m[32m      "integrity": "sha512-Fd4gABb+ycGAmKou8eMftCupSir5lRxqf4aD/vd0cD2qc4HL07OjCeuHMr8Ro4CoMaeCKDB0/ECBOVWjTwUvPQ==",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=8"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/micromatch/node_modules/fill-range/node_modules/extend-shallow": {[m
[32m+[m[32m      "version": "2.0.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",[m
[32m+[m[32m      "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "is-extendable": "^0.1.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/object.pick": {[m
[32m+[m[32m      "version": "1.3.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/object.pick/-/object.pick-1.3.0.tgz",[m
[32m+[m[32m      "integrity": "sha1-h6EKxMFpS9Lhy/U1kaZhQftd10c=",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "isobject": "^3.0.1"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/npmlog/node_modules/gauge/node_modules/lodash.pad": {[m
[32m+[m[32m      "version": "4.4.0",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "lodash._baseslice": "~4.0.0",[m
[32m+[m[32m        "lodash._basetostring": "~4.12.0",[m
[32m+[m[32m        "lodash.tostring": "^4.0.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/node-gyp": {[m
[32m+[m[32m      "version": "3.6.0",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "fstream": "^1.0.0",[m
[32m+[m[32m        "glob": "^7.0.3",[m
[32m+[m[32m        "graceful-fs": "^4.1.2",[m
[32m+[m[32m        "minimatch": "^3.0.2",[m
[32m+[m[32m        "mkdirp": "^0.5.0",[m
[32m+[m[32m        "nopt": "2 || 3",[m
[32m+[m[32m        "npmlog": "0 || 1 || 2 || 3 || 4",[m
[32m+[m[32m        "osenv": "0",[m
[32m+[m[32m        "request": "2",[m
[32m+[m[32m        "rimraf": "2",[m
[32m+[m[32m        "semver": "~5.3.0",[m
[32m+[m[32m        "tar": "^2.0.0",[m
[32m+[m[32m        "which": "1"[m
[32m+[m[32m      },[m
[32m+[m[32m      "bin": {[m
[32m+[m[32m        "node-gyp": "bin/node-gyp.js"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.8.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/registry-url": {[m
[32m+[m[32m      "version": "5.1.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/registry-url/-/registry-url-5.1.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-8acYXXTI0AkQv6RAOjE3vOaIXZkT9wo4LOFbBKYQEEnnMNBpKqdUrI6S4NT0KPIo/WVvJ5tE/X5LF/TQUf0ekw==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "rc": "^1.2.8"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=8"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/readable-stream/node_modules/safe-buffer": {[m
[32m+[m[32m      "version": "5.1.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-Gd2UZBJDkXlY7GbJxfsE8/nvKkUEU1G38c1siN6QP6a9PT9MmHB8GnpscSmMJSoF8LOIrt8ud/wPtojys4G6+g=="[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/deep-equal": {[m
[32m+[m[32m      "version": "2.0.5",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/deep-equal/-/deep-equal-2.0.5.tgz",[m
[32m+[m[32m      "integrity": "sha512-nPiRgmbAtm1a3JsnLCf6/SLfXcjyN5v8L1TXzdCmHrXJ4hx+gW/w1YCcn7z8gJtSiDArZCgYtbao3QqLm/N1Sw==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "call-bind": "^1.0.0",[m
[32m+[m[32m        "es-get-iterator": "^1.1.1",[m
[32m+[m[32m        "get-intrinsic": "^1.0.1",[m
[32m+[m[32m        "is-arguments": "^1.0.4",[m
[32m+[m[32m        "is-date-object": "^1.0.2",[m
[32m+[m[32m        "is-regex": "^1.1.1",[m
[32m+[m[32m        "isarray": "^2.0.5",[m
[32m+[m[32m        "object-is": "^1.1.4",[m
[32m+[m[32m        "object-keys": "^1.1.1",[m
[32m+[m[32m        "object.assign": "^4.1.2",[m
[32m+[m[32m        "regexp.prototype.flags": "^1.3.0",[m
[32m+[m[32m        "side-channel": "^1.0.3",[m
[32m+[m[32m        "which-boxed-primitive": "^1.0.1",[m
[32m+[m[32m        "which-collection": "^1.0.1",[m
[32m+[m[32m        "which-typed-array": "^1.1.2"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/sponsors/ljharb"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/ts-node": {[m
[32m+[m[32m      "version": "9.1.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/ts-node/-/ts-node-9.1.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-hPlt7ZACERQGf03M253ytLY3dHbGNGrAq9qIHWUY9XHYl1z7wYngSr3OQ5xmui8o2AaxsONxIzjafLUiWBo1Fg==",[m
[32m+[m[32m      "dev": true,[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "arg": "^4.1.0",[m
[32m+[m[32m        "create-require": "^1.1.0",[m
[32m+[m[32m        "diff": "^4.0.1",[m
[32m+[m[32m        "make-error": "^1.1.1",[m
[32m+[m[32m        "source-map-support": "^0.5.17",[m
[32m+[m[32m        "yn": "3.1.1"[m
[32m+[m[32m      },[m
[32m+[m[32m      "bin": {[m
[32m+[m[32m        "ts-node": "dist/bin.js",[m
[32m+[m[32m        "ts-node-script": "dist/bin-script.js",[m
[32m+[m[32m        "ts-node-transpile-only": "dist/bin-transpile.js",[m
[32m+[m[32m        "ts-script": "dist/bin-script-deprecated.js"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=10.0.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "typescript": ">=2.7"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@protobufjs/aspromise": {[m
[32m+[m[32m      "version": "1.1.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@protobufjs/aspromise/-/aspromise-1.1.2.tgz",[m
[32m+[m[32m      "integrity": "sha1-m4sMxmPWaafY9vXQiToU00jzD78="[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/repeat-element": {[m
[32m+[m[32m      "version": "1.1.4",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/repeat-element/-/repeat-element-1.1.4.tgz",[m
[32m+[m[32m      "integrity": "sha512-LFiNfRcSu7KK3evMyYOuCzv3L10TW7yC1G2/+StMjK8Y6Vqd2MG7r/Qjw4ghtuCOjFvlnms/iMmLqpvW/ES/WQ==",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/extglob/node_modules/is-accessor-descriptor": {[m
[32m+[m[32m      "version": "1.0.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "kind-of": "^6.0.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/request/node_modules/har-validator/node_modules/is-my-json-valid/node_modules/xtend": {[m
[32m+[m[32m      "version": "4.0.1",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.4"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/merge-descriptors": {[m
[32m+[m[32m      "version": "1.0.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-1.0.1.tgz",[m
[32m+[m[32m      "integrity": "sha1-sAqqVW3YtEVoFQ7J0blT8/kMu2E="[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@apollographql/graphql-playground-html": {[m
[32m+[m[32m      "version": "1.6.29",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@apollographql/graphql-playground-html/-/graphql-playground-html-1.6.29.tgz",[m
[32m+[m[32m      "integrity": "sha512-xCcXpoz52rI4ksJSdOCxeOCn2DLocxwHf9dVT/Q90Pte1LX+LY+91SFtJF3KXVHH8kEin+g1KKCQPKBjZJfWNA==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "xss": "^1.0.8"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/extglob": {[m
[32m+[m[32m      "version": "2.0.4",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/extglob/-/extglob-2.0.4.tgz",[m
[32m+[m[32m      "integrity": "sha512-Nmb6QXkELsuBr24CJSkilo6UHHgbekK5UiZgfE6UHD3Eb27YC6oD+bhcT+tJ6cl8dmsgdQxnWlcry8ksBIBLpw==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "array-unique": "^0.3.2",[m
[32m+[m[32m        "define-property": "^1.0.0",[m
[32m+[m[32m        "expand-brackets": "^2.1.4",[m
[32m+[m[32m        "extend-shallow": "^2.0.1",[m
[32m+[m[32m        "fragment-cache": "^0.2.1",[m
[32m+[m[32m        "regex-not": "^1.0.0",[m
[32m+[m[32m        "snapdragon": "^0.8.1",[m
[32m+[m[32m        "to-regex": "^3.0.1"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/cors": {[m
[32m+[m[32m      "version": "2.8.5",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/cors/-/cors-2.8.5.tgz",[m
[32m+[m[32m      "integrity": "sha512-KIHbLJqu73RGr/hnbrO9uBeixNGuvSQjul/jdFvS/KFSIH1hWVd1ng7zOHx+YrEfInLG7q4n6GHQ9cDtxv/P6g==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "object-assign": "^4",[m
[32m+[m[32m        "vary": "^1"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.10"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/forever-monitor/node_modules/braces": {[m
[32m+[m[32m      "version": "2.3.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/braces/-/braces-2.3.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-aNdbnj9P8PjdXU4ybaWLK2IF3jc/EoDYbC7AazW6to3TRsfXxscC9UXOB5iDiEQrkyIbWp2SLQda4+QAa7nc3w==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "arr-flatten": "^1.1.0",[m
[32m+[m[32m        "array-unique": "^0.3.2",[m
[32m+[m[32m        "extend-shallow": "^2.0.1",[m
[32m+[m[32m        "fill-range": "^4.0.0",[m
[32m+[m[32m        "isobject": "^3.0.1",[m
[32m+[m[32m        "repeat-element": "^1.1.2",[m
[32m+[m[32m        "snapdragon": "^0.8.1",[m
[32m+[m[32m        "snapdragon-node": "^2.0.1",[m
[32m+[m[32m        "split-string": "^3.0.2",[m
[32m+[m[32m        "to-regex": "^3.0.1"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/request/node_modules/har-validator/node_modules/chalk/node_modules/supports-color": {[m
[32m+[m[32m      "version": "2.0.0",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.8.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/depd": {[m
[32m+[m[32m      "version": "1.1.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/depd/-/depd-1.1.2.tgz",[m
[32m+[m[32m      "integrity": "sha1-m81S4UwJd2PnSbJ0xDRu0uVgtak=",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.6"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/is-accessor-descriptor/node_modules/kind-of": {[m
[32m+[m[32m      "version": "3.2.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",[m
[32m+[m[32m      "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "is-buffer": "^1.1.5"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/ret": {[m
[32m+[m[32m      "version": "0.1.15",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/ret/-/ret-0.1.15.tgz",[m
[32m+[m[32m      "integrity": "sha512-TTlYpa+OL+vMMNG24xSlQGEJ3B/RzEfUlLct7b5G/ytav+wPrplCpVMFuwzXbkecJrb6IYo1iFb0S9v37754mg==",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.12"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/is-data-descriptor": {[m
[32m+[m[32m      "version": "0.1.4",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",[m
[32m+[m[32m      "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "kind-of": "^3.0.2"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/touch": {[m
[32m+[m[32m      "version": "3.1.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/touch/-/touch-3.1.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-WBx8Uy5TLtOSRtIq+M03/sKDrXCLHxwDcquSP2c43Le03/9serjQBIztjRz6FkJez9D/hleyAXTBGLwwZUw9lA==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "nopt": "~1.0.10"[m
[32m+[m[32m      },[m
[32m+[m[32m      "bin": {[m
[32m+[m[32m        "nodetouch": "bin/nodetouch.js"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/diff": {[m
[32m+[m[32m      "version": "4.0.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/diff/-/diff-4.0.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-58lmxKSA4BNyLz+HHMUzlOEpg09FV+ev6ZMe3vJihgdxzgcwZ8VoEEPmALCZG9LmqfVoNMMKpttIYTVG6uDY7A==",[m
[32m+[m[32m      "dev": true,[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.3.1"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/mixin-deep/node_modules/is-extendable": {[m
[32m+[m[32m      "version": "1.0.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/is-extendable/-/is-extendable-1.0.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-arnXMxT1hhoKo9k1LZdmlNyJdDDfy2v0fXjFlmok4+i8ul/6WlbVge9bhM74OpNPQPMGUToDtz+KXa1PneJxOA==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "is-plain-object": "^2.0.4"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/async": {[m
[32m+[m[32m      "version": "2.6.3",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/async/-/async-2.6.3.tgz",[m
[32m+[m[32m      "integrity": "sha512-zflvls11DCy+dQWzTW2dzuilv8Z5X/pjfmZOWba6TNIVDm+2UDaJmXSOXlasHKfNBs8oo3M0aT50fDEWfKZjXg==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "lodash": "^4.17.14"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/is-negative-zero": {[m
[32m+[m[32m      "version": "2.0.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/is-negative-zero/-/is-negative-zero-2.0.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-2z6JzQvZRa9A2Y7xC6dQQm4FSTSTNWjKIYYTt4246eMTJmIo0Q+ZyOsU66X8lxK1AbB92dFeglPLrhwpeRKO6w==",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.4"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/sponsors/ljharb"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/etag": {[m
[32m+[m[32m      "version": "1.8.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",[m
[32m+[m[32m      "integrity": "sha1-Qa4u62XvpiJorr/qg6x9eSmbCIc=",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.6"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/optimism": {[m
[32m+[m[32m      "version": "0.16.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/optimism/-/optimism-0.16.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-64i+Uw3otrndfq5kaoGNoY7pvOhSsjFEN4bdEFh80MWVk/dbgJfMv7VFDeCT8LxNAlEVhQmdVEbfE7X2nWNIIg==",[m
[32m+[m[32m      "optional": true,[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@wry/context": "^0.6.0",[m
[32m+[m[32m        "@wry/trie": "^0.3.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/fs.realpath": {[m
[32m+[m[32m      "version": "1.0.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/fs.realpath/-/fs.realpath-1.0.0.tgz",[m
[32m+[m[32m      "integrity": "sha1-FQStJSMVjKpA20onh8sBQRmU6k8="[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/sorted-object": {[m
[32m+[m[32m      "version": "2.0.0",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "WTFPL"[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/is-installed-globally": {[m
[32m+[m[32m      "version": "0.3.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/is-installed-globally/-/is-installed-globally-0.3.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-wZ8x1js7Ia0kecP/CHM/3ABkAmujX7WPvQk6uu3Fly/Mk44pySulQpnHG46OMjHGXApINnV4QhY3SWnECO2z5g==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "global-dirs": "^2.0.1",[m
[32m+[m[32m        "is-path-inside": "^3.0.1"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=8"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/sponsors/sindresorhus"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/object-path": {[m
[32m+[m[32m      "version": "0.11.5",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/object-path/-/object-path-0.11.5.tgz",[m
[32m+[m[32m      "integrity": "sha512-jgSbThcoR/s+XumvGMTMf81QVBmah+/Q7K7YduKeKVWL7N111unR2d6pZZarSk6kY/caeNxUDyxOvMWyzoU2eg==",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 10.12.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/snapdragon": {[m
[32m+[m[32m      "version": "0.8.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/snapdragon/-/snapdragon-0.8.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-FtyOnWN/wCHTVXOMwvSv26d+ko5vWlIDD6zoUJ7LW8vh+ZBC8QdljveRP+crNrtBwioEUWy/4dMtbBjA4ioNlg==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "base": "^0.11.1",[m
[32m+[m[32m        "debug": "^2.2.0",[m
[32m+[m[32m        "define-property": "^0.2.5",[m
[32m+[m[32m        "extend-shallow": "^2.0.1",[m
[32m+[m[32m        "map-cache": "^0.2.2",[m
[32m+[m[32m        "source-map": "^0.5.6",[m
[32m+[m[32m        "source-map-resolve": "^0.5.0",[m
[32m+[m[32m        "use": "^3.1.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/lodash._arrayeach": {[m
[32m+[m[32m      "version": "3.0.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/lodash._arrayeach/-/lodash._arrayeach-3.0.0.tgz",[m
[32m+[m[32m      "integrity": "sha1-urFWsqkNPxu9XGU0AzSeXlkz754="[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/revalidator": {[m
[32m+[m[32m      "version": "0.1.8",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/revalidator/-/revalidator-0.1.8.tgz",[m
[32m+[m[32m      "integrity": "sha1-/s5hv6DBtSoga9axgZgYS91SOjs=",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.4.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/readdirp": {[m
[32m+[m[32m      "version": "3.5.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.5.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-cMhu7c/8rdhkHXWsY+osBhfSy0JikwpHK/5+imo+LpeasTF8ouErHrlYkwT0++njiyuDvc7OFY5T3ukvZ8qmFQ==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "picomatch": "^2.2.1"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=8.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/opener": {[m
[32m+[m[32m      "version": "1.4.1",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "WTFPL",[m
[32m+[m[32m      "bin": {[m
[32m+[m[32m        "opener": "opener.js"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/resolve-url": {[m
[32m+[m[32m      "version": "0.2.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/resolve-url/-/resolve-url-0.2.1.tgz",[m
[32m+[m[32m      "integrity": "sha1-LGN/53yJOv0qZj/iGqkIAGjiBSo=",[m
[32m+[m[32m      "deprecated": "https://github.com/lydell/resolve-url#deprecated"[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/request/node_modules/hawk/node_modules/hoek": {[m
[32m+[m[32m      "version": "2.16.3",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "BSD-3-Clause",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.40"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/osenv/node_modules/os-homedir": {[m
[32m+[m[32m      "version": "1.0.0",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/snapdragon-node": {[m
[32m+[m[32m      "version": "2.1.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/snapdragon-node/-/snapdragon-node-2.1.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-O27l4xaMYt/RSQ5TR3vpWCAB5Kb/czIcqUFOM/C4fYcLnbZUc1PkjTAMjof2pBWaSTwOUd6qUHcFGVGj7aIwnw==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "define-property": "^1.0.0",[m
[32m+[m[32m        "isobject": "^3.0.0",[m
[32m+[m[32m        "snapdragon-util": "^3.0.1"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/sha/node_modules/readable-stream/node_modules/isarray": {[m
[32m+[m[32m      "version": "0.0.1",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "MIT"[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/lodash.isstring": {[m
[32m+[m[32m      "version": "4.0.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/lodash.isstring/-/lodash.isstring-4.0.1.tgz",[m
[32m+[m[32m      "integrity": "sha1-1SfftUVuynzJu5XV2ur4i6VKVFE="[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/sha/node_modules/readable-stream/node_modules/core-util-is": {[m
[32m+[m[32m      "version": "1.0.1",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "MIT"[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/cli-boxes": {[m
[32m+[m[32m      "version": "2.2.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/cli-boxes/-/cli-boxes-2.2.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-y4coMcylgSCdVinjiDBuR8PCC2bLjyGTwEmPb9NHR/QaNU6EUOXcTY/s6VjGMD6ENSEaeQYHCY0GNGS5jfMwPw==",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=6"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/sponsors/sindresorhus"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/glob": {[m
[32m+[m[32m      "version": "7.0.6",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "ISC",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "fs.realpath": "^1.0.0",[m
[32m+[m[32m        "inflight": "^1.0.4",[m
[32m+[m[32m        "inherits": "2",[m
[32m+[m[32m        "minimatch": "^3.0.2",[m
[32m+[m[32m        "once": "^1.3.0",[m
[32m+[m[32m        "path-is-absolute": "^1.0.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": "*"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/ps-tree": {[m
[32m+[m[32m      "version": "1.2.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/ps-tree/-/ps-tree-1.2.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-0VnamPPYHl4uaU/nSFeZZpR21QAWRz+sRv4iW9+v/GS/J5U5iZB5BNN6J0RMoOvdx2gWM2+ZFMIm58q24e4UYA==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "event-stream": "=3.3.4"[m
[32m+[m[32m      },[m
[32m+[m[32m      "bin": {[m
[32m+[m[32m        "ps-tree": "bin/ps-tree.js"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.10"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/has-values/node_modules/is-number/node_modules/kind-of": {[m
[32m+[m[32m      "version": "3.2.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",[m
[32m+[m[32m      "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "is-buffer": "^1.1.5"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/read-installed/node_modules/readdir-scoped-modules": {[m
[32m+[m[32m      "version": "1.0.2",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "ISC",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "debuglog": "^1.0.1",[m
[32m+[m[32m        "dezalgo": "^1.0.0",[m
[32m+[m[32m        "graceful-fs": "^4.1.2",[m
[32m+[m[32m        "once": "^1.3.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/is-typed-array/node_modules/is-regex": {[m
[32m+[m[32m      "version": "1.1.4",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/is-regex/-/is-regex-1.1.4.tgz",[m
[32m+[m[32m      "integrity": "sha512-kvRdxDsxZjhzUX07ZnLydzS1TU/TJlTUHHY4YLL87e37oUA49DfkLqgy+VjFocowy29cKvcSiu+kIv728jTTVg==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "call-bind": "^1.0.2",[m
[32m+[m[32m        "has-tostringtag": "^1.0.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.4"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/sponsors/ljharb"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/raw-body/node_modules/setprototypeof": {[m
[32m+[m[32m      "version": "1.1.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.1.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-JvdAWfbXeIGaZ9cILp38HntZSFSo3mWg6xGcJJsd+d4aRMOqauag1C63dJfDw7OaMYwEbHMOxEZ1lqVRYP2OAw=="[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/duplexer": {[m
[32m+[m[32m      "version": "0.1.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/duplexer/-/duplexer-0.1.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-jtD6YG370ZCIi/9GTaJKQxWTZD045+4R4hTk/x1UyoqadyJ9x9CgSi1RlVDQF8U2sxLLSnFkCaMihqljHIWgMg=="[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/fs-capacitor": {[m
[32m+[m[32m      "version": "6.2.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/fs-capacitor/-/fs-capacitor-6.2.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-nKcE1UduoSKX27NSZlg879LdQc94OtbOsEmKMN2MBNudXREvijRKx2GEBsTMTfws+BrbkJoEuynbGSVRSpauvw==",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=10"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/on-finished": {[m
[32m+[m[32m      "version": "2.3.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.3.0.tgz",[m
[32m+[m[32m      "integrity": "sha1-IPEzZIGwg811M3mSoWlxqi2QaUc=",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "ee-first": "1.1.1"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.8"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/expand-brackets": {[m
[32m+[m[32m      "version": "2.1.4",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-2.1.4.tgz",[m
[32m+[m[32m      "integrity": "sha1-t3c14xXOMPa27/D4OwQVGiJEliI=",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "debug": "^2.3.3",[m
[32m+[m[32m        "define-property": "^0.2.5",[m
[32m+[m[32m        "extend-shallow": "^2.0.1",[m
[32m+[m[32m        "posix-character-classes": "^0.1.0",[m
[32m+[m[32m        "regex-not": "^1.0.0",[m
[32m+[m[32m        "snapdragon": "^0.8.1",[m
[32m+[m[32m        "to-regex": "^3.0.1"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/is-descriptor": {[m
[32m+[m[32m      "version": "0.1.6",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",[m
[32m+[m[32m      "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "is-accessor-descriptor": "^0.1.6",[m
[32m+[m[32m        "is-data-descriptor": "^0.1.4",[m
[32m+[m[32m        "kind-of": "^5.0.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/resumer": {[m
[32m+[m[32m      "version": "0.0.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/resumer/-/resumer-0.0.0.tgz",[m
[32m+[m[32m      "integrity": "sha1-8ej0YeQGS6Oegq883CqMiT0HZ1k=",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "through": "~2.3.4"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/read-package-json/node_modules/glob/node_modules/path-is-absolute": {[m
[32m+[m[32m      "version": "1.0.0",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/request/node_modules/bl": {[m
[32m+[m[32m      "version": "1.1.2",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "readable-stream": "~2.0.5"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/get-stream": {[m
[32m+[m[32m      "version": "4.1.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/get-stream/-/get-stream-4.1.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-GMat4EJ5161kIy2HevLlr4luNjBgvmj413KaQA7jt4V8B4RDsfpHk7WQ9GVqfYyyx8OS/L66Kox+rJRNklLK7w==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "pump": "^3.0.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=6"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/lodash.keysin": {[m
[32m+[m[32m      "version": "3.0.8",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/lodash.keysin/-/lodash.keysin-3.0.8.tgz",[m
[32m+[m[32m      "integrity": "sha1-IsRJPrvtsUJ5YqVLRFssinZ/tH8=",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "lodash.isarguments": "^3.0.0",[m
[32m+[m[32m        "lodash.isarray": "^3.0.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@protobufjs/pool": {[m
[32m+[m[32m      "version": "1.1.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@protobufjs/pool/-/pool-1.1.0.tgz",[m
[32m+[m[32m      "integrity": "sha1-Cf0V8tbTq/qbZbw2ZQbWrXhG/1Q="[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/lodash.isboolean": {[m
[32m+[m[32m      "version": "3.0.3",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/lodash.isboolean/-/lodash.isboolean-3.0.3.tgz",[m
[32m+[m[32m      "integrity": "sha1-bC4XHbKiV82WgC/UOwGyDV9YcPY="[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/request/node_modules/stringstream": {[m
[32m+[m[32m      "version": "0.0.5",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "MIT"[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/request/node_modules/har-validator/node_modules/is-my-json-valid": {[m
[32m+[m[32m      "version": "2.13.1",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "generate-function": "^2.0.0",[m
[32m+[m[32m        "generate-object-property": "^1.1.0",[m
[32m+[m[32m        "jsonpointer": "2.0.0",[m
[32m+[m[32m        "xtend": "^4.0.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/prettier": {[m
[32m+[m[32m      "version": "2.2.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/prettier/-/prettier-2.2.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-PqyhM2yCjg/oKkFPtTGUojv7gnZAoG80ttl45O6x2Ug/rMJw4wcc9k6aaf2hibP7BGVCCM33gZoGjyvt9mm16Q==",[m
[32m+[m[32m      "dev": true,[m
[32m+[m[32m      "bin": {[m
[32m+[m[32m        "prettier": "bin-prettier.js"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=10.13.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/object-keys": {[m
[32m+[m[32m      "version": "1.1.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/object-keys/-/object-keys-1.1.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-NuAESUOUMrlIXOfHKzD6bpPu3tYt3xvjNdRIQ+FeT0lNb4K8WR70CaDxhuNguS2XG+GjkyMwOzsN5ZktImfhLA==",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.4"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/regexp.prototype.flags": {[m
[32m+[m[32m      "version": "1.3.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/regexp.prototype.flags/-/regexp.prototype.flags-1.3.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-JiBdRBq91WlY7uRJ0ds7R+dU02i6LKi8r3BuQhNXn+kmeLN+EfHhfjqMRis1zJxnlu88hq/4dx0P2OP3APRTOA==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "call-bind": "^1.0.2",[m
[32m+[m[32m        "define-properties": "^1.1.3"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.4"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/sponsors/ljharb"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/value-or-promise": {[m
[32m+[m[32m      "version": "1.0.10",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/value-or-promise/-/value-or-promise-1.0.10.tgz",[m
[32m+[m[32m      "integrity": "sha512-1OwTzvcfXkAfabk60UVr5NdjtjJ0Fg0T5+B1bhxtrOEwSH2fe8y4DnLgoksfCyd8yZCOQQHB0qLMQnwgCjbXLQ==",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=12"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/node-fetch": {[m
[32m+[m[32m      "version": "2.6.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/node-fetch/-/node-fetch-2.6.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-V4aYg89jEoVRxRb2fJdAg8FHvI7cEyYdVAh94HH0UIK8oJxUfkjlDQN9RbMx+bEjP7+ggMiFRprSti032Oipxw==",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": "4.x || >=6.0.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@types/mime": {[m
[32m+[m[32m      "version": "1.3.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@types/mime/-/mime-1.3.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-YATxVxgRqNH6nHEIsvg6k2Boc1JHI9ZbH5iWFFv/MTkchz3b1ieGDa5T0a9RznNdI0KhVbdbWSN+KWWrQZRxTw=="[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/glob": {[m
[32m+[m[32m      "version": "7.1.7",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/glob/-/glob-7.1.7.tgz",[m
[32m+[m[32m      "integrity": "sha512-OvD9ENzPLbegENnYP5UUfJIirTg4+XwMWGaQfQTY0JenxNvvIKP3U3/tAQSPIu/lHxXYSZmpXlUHeqAIdKzBLQ==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "fs.realpath": "^1.0.0",[m
[32m+[m[32m        "inflight": "^1.0.4",[m
[32m+[m[32m        "inherits": "2",[m
[32m+[m[32m        "minimatch": "^3.0.4",[m
[32m+[m[32m        "once": "^1.3.0",[m
[32m+[m[32m        "path-is-absolute": "^1.0.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": "*"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/sponsors/isaacs"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/portfinder": {[m
[32m+[m[32m      "version": "1.0.28",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/portfinder/-/portfinder-1.0.28.tgz",[m
[32m+[m[32m      "integrity": "sha512-Se+2isanIcEqf2XMHjyUKskczxbPH7dQnlMjXX6+dybayyHvAf/TCgyMRlzf/B6QDhAEFOGes0pzRo3by4AbMA==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "async": "^2.6.2",[m
[32m+[m[32m        "debug": "^3.1.1",[m
[32m+[m[32m        "mkdirp": "^0.5.5"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.12.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/sha/node_modules/readable-stream/node_modules/util-deprecate": {[m
[32m+[m[32m      "version": "1.0.1",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "MIT"[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/pump": {[m
[32m+[m[32m      "version": "3.0.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/pump/-/pump-3.0.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-LwZy+p3SFs1Pytd/jYct4wpv49HiYCqd9Rlc5ZVdk0V+8Yzv6jR5Blk3TRmPL1ft69TxP0IMZGJ+WPFU2BFhww==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "end-of-stream": "^1.1.0",[m
[32m+[m[32m        "once": "^1.3.1"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/object-copy/node_modules/kind-of": {[m
[32m+[m[32m      "version": "3.2.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",[m
[32m+[m[32m      "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "is-buffer": "^1.1.5"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/escape-goat": {[m
[32m+[m[32m      "version": "2.1.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/escape-goat/-/escape-goat-2.1.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-8/uIhbG12Csjy2JEW7D9pHbreaVaS/OpN3ycnyvElTdwM5n6GY6W6e2IPemfvGZeUMqZ9A/3GqIZMgKnBhAw/Q==",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=8"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/forever-monitor/node_modules/glob-parent/node_modules/is-glob": {[m
[32m+[m[32m      "version": "3.1.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-3.1.0.tgz",[m
[32m+[m[32m      "integrity": "sha1-e6WuJCF4BKxwcHuWkiVnSGzD6Eo=",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "is-extglob": "^2.1.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/utils-merge": {[m
[32m+[m[32m      "version": "1.0.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/utils-merge/-/utils-merge-1.0.1.tgz",[m
[32m+[m[32m      "integrity": "sha1-n5VxD1CiZ5R7LMwSR0HBAoQn5xM=",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.4.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/minimatch/node_modules/brace-expansion/node_modules/balanced-match": {[m
[32m+[m[32m      "version": "0.4.2",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "MIT"[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/xml-js": {[m
[32m+[m[32m      "version": "1.6.11",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/xml-js/-/xml-js-1.6.11.tgz",[m
[32m+[m[32m      "integrity": "sha512-7rVi2KMfwfWFl+GpPg6m80IVMWXLRjO+PxTq7V2CDhoGak0wzYzFgUY2m4XJ47OGdXd8eLE8EmwfAmdjw7lC1g==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "sax": "^1.2.4"[m
[32m+[m[32m      },[m
[32m+[m[32m      "bin": {[m
[32m+[m[32m        "xml-js": "bin/cli.js"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/get-value": {[m
[32m+[m[32m      "version": "2.0.6",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/get-value/-/get-value-2.0.6.tgz",[m
[32m+[m[32m      "integrity": "sha1-3BXKHGcjh8p2vTesCjlbogQqLCg=",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/base/node_modules/define-property": {[m
[32m+[m[32m      "version": "1.0.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",[m
[32m+[m[32m      "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "is-descriptor": "^1.0.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/is-bigint": {[m
[32m+[m[32m      "version": "1.0.4",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/is-bigint/-/is-bigint-1.0.4.tgz",[m
[32m+[m[32m      "integrity": "sha512-zB9CruMamjym81i2JZ3UMn54PKGsQzsJeo6xvN3HJJ4CAsQNB6iRutp2To77OfCNuoxspsIhzaPoO1zyCEhFOg==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "has-bigints": "^1.0.1"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/sponsors/ljharb"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/fsevents": {[m
[32m+[m[32m      "version": "2.3.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-xiqMQR4xAeHTuB9uWm+fFRcIOgKBMiOBP+eXiyT7jsgVCq1bkVygt00oASowB7EdtpOHaaPgKt812P9ab+DDKA==",[m
[32m+[m[32m      "hasInstallScript": true,[m
[32m+[m[32m      "optional": true,[m
[32m+[m[32m      "os": [[m
[32m+[m[32m        "darwin"[m
[32m+[m[32m      ],[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/union-value": {[m
[32m+[m[32m      "version": "1.0.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/union-value/-/union-value-1.0.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-tJfXmxMeWYnczCVs7XAEvIV7ieppALdyepWMkHkwciRpZraG/xwT+s2JN8+pr1+8jCRf80FFzvr+MpQeeoF4Xg==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "arr-union": "^3.1.0",[m
[32m+[m[32m        "get-value": "^2.0.6",[m
[32m+[m[32m        "is-extendable": "^0.1.1",[m
[32m+[m[32m        "set-value": "^2.0.1"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/read-package-json/node_modules/json-parse-helpfulerror/node_modules/jju": {[m
[32m+[m[32m      "version": "1.3.0",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "WTFPL"[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/available-typed-arrays": {[m
[32m+[m[32m      "version": "1.0.4",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/available-typed-arrays/-/available-typed-arrays-1.0.4.tgz",[m
[32m+[m[32m      "integrity": "sha512-SA5mXJWrId1TaQjfxUYghbqQ/hYioKmLJvPJyDuYRtXXenFNMjj4hSSt1Cf1xsuXSXrtxrVC5Ot4eU6cOtBDdA==",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.4"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/sponsors/ljharb"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/npm/node_modules/validate-npm-package-name/node_modules/builtins": {[m
[32m+[m[32m      "version": "0.0.7",[m
[32m+[m[32m      "inBundle": true,[m
[32m+[m[32m      "license": "MIT"[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/path-is-absolute": {[m
[32m+[m[32m      "version": "1.0.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/path-is-absolute/-/path-is-absolute-1.0.1.tgz",[m
[32m+[m[32m      "integrity": "sha1-F0uSaHNVNP+8es5r9TpanhtcX18=",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@types/long": {[m
[32m+[m[32m      "version": "4.0.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@types/long/-/long-4.0.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-5tXH6Bx/kNGd3MgffdmP4dy2Z+G4eaXw0SE81Tq3BNadtnMR5/ySMzX4SLEzHJzSmPNn4HIdpQsBvXMUykr58w=="[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/decode-uri-component": {[m
[32m+[m[32m      "version": "0.2.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/decode-uri-component/-/decode-uri-component-0.2.0.tgz",[m
[32m+[m[32m      "integrity": "sha1-6zkTMzRYd1y4TNGh+uBiEGu4dUU=",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/is-symbol": {[m
[32m+[m[32m      "version": "1.0.3",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/is-symbol/-/is-symbol-1.0.3.tgz",[m
[32m+[m[32m      "integrity": "sha512-OwijhaRSgqvhm/0ZdAcXNZt9lYdKFpcRDT5ULUuYXPoT794UNOdU+gpT6Rzo7b4V2HUl/op6GqY894AZwv9faQ==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "has-symbols": "^1.0.1"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.4"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/sponsors/ljharb"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/is-boolean-object": {[m
[32m+[m[32m      "version": "1.1.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/is-boolean-object/-/is-boolean-object-1.1.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-gDYaKHJmnj4aWxyj6YHyXVpdQawtVLHU5cb+eztPGczf6cjuTdwve5ZIEfgXqH4e57An1D1AKf8CZ3kYrQRqYA==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "call-bind": "^1.0.2",[m
[32m+[m[32m        "has-tostringtag": "^1.0.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.4"[m
[32m+[m[32m      },[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "url": "https://github.com/sponsors/ljharb"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/cssfilter": {[m
[32m+[m[32m      "version": "0.0.10",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/cssfilter/-/cssfilter-0.0.10.tgz",[m
[32m+[m[32m      "integrity": "sha1-xtJnJjKi5cg+AT5oZKQs6N79IK4="[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@graphql-tools/graphql-file-loader": {[m
[32m+[m[32m      "version": "7.3.3",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@graphql-tools/graphql-file-loader/-/graphql-file-loader-7.3.3.tgz",[m
[32m+[m[32m      "integrity": "sha512-6kUJZiNpYKVhum9E5wfl5PyLLupEDYdH7c8l6oMrk6c7EPEVs6iSUyB7yQoWrtJccJLULBW2CRQ5IHp5JYK0mA==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@graphql-tools/import": "^6.5.7",[m
[32m+[m[32m        "@graphql-tools/utils": "^8.5.1",[m
[32m+[m[32m        "globby": "^11.0.3",[m
[32m+[m[32m        "tslib": "~2.3.0",[m
[32m+[m[32m        "unixify": "^1.0.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "graphql": "^14.0.0 || ^15.0.0 || ^16.0.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@nodelib/fs.scandir": {[m
[32m+[m[32m      "version": "2.1.5",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",[m
[32m+[m[32m      "integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@nodelib/fs.stat": "2.0.5",[m
[32m+[m[32m        "run-parallel": "^1.1.9"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 8"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/string-width/node_modules/strip-ansi": {[m
[32m+[m[32m      "version": "6.0.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-AuvKTrTfQNYNIctbR1K/YGTR1756GycPsg7b9bdV9Duqur4gv6aKqHXah67Z8ImS7WEz5QVcOtlfW2rZEugt6w==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "ansi-regex": "^5.0.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=8"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/mime-types": {[m
[32m+[m[32m      "version": "2.1.32",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.32.tgz",[m
[32m+[m[32m      "integrity": "sha512-hJGaVS4G4c9TSMYh2n6SQAGrC4RnfU+daP8G7cSCmaqNjiOoUY0VHCMS42pxnQmVF1GWwFhbHWn3RIxCqTmZ9A==",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "mime-db": "1.49.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">= 0.6"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/express/node_modules/setprototypeof": {[m
[32m+[m[32m      "version": "1.1.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.1.1.tgz",[m
[32m+[m[32m      "