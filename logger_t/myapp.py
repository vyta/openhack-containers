import os
import sys
import string
import errno

try:  
   os.environ["KEY"]
except KeyError: 
   print("Error: Invalid environment variable \"KEY\"")
   sys.exit(1)

key = os.environ.get("KEY").strip()
if not key:
    print("Error: Value for \"KEY\" is empty")
    sys.exit(1) 

write_str = "ERROR"*1024*1024 # 5MB

output_path = "/usr/src/app/logs/logging.txt"

print("Challenge 4 app up and running")
with open(output_path, "w") as f:
    while True:
        try:
            f.write(write_str)
            f.flush()
        except IOError as err:
            if err.errno == errno.ENOSPC:
                write_str_len = len(write_str)
                if write_str_len > 1:
                    write_str = write_str[:write_str_len/2]
                else:
                    break
            else:
                raise