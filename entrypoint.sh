#!/bin/bash
set -e

# exec the container's main process (what's set as CMD in the Dockerfile)
exec "$@"
