# The offline dictionary goes here

This folder holds one file, `en-v1.jsonl.gz`, and the app looks for it at
`dict/en-v1.jsonl.gz`.

Until that file exists, everything still works: the **Definition** button looks words up
online instead, and *Aa → Dictionary* says the offline file isn't on the server yet.

To build it:

1. Download `WNdb-3.0.tar.gz` from <https://wordnet.princeton.edu/download/current-version>
   (about 10 MB).
2. `python3 tools/build-dictionary.py WNdb-3.0.tar.gz`
3. Upload the `en-v1.jsonl.gz` it writes into this folder.

WordNet comes from Princeton University and may be redistributed; keep its `LICENSE`
file beside the data if you publish it.
