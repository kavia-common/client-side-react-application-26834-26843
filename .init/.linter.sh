#!/bin/bash
cd /home/kavia/workspace/code-generation/client-side-react-application-26834-26843/frontend_application
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

