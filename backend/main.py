import uvicorn
import sys


if __name__ == '__main__':
    args = sys.argv
    if args[1] == "run":
        uvicorn.run("alphago:app", reload=True, debug=True, workers=2)
