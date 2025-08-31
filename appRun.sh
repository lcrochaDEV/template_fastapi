#!/bin/bash

source env-lnx/bin/activate

uvicorn app:app --reload