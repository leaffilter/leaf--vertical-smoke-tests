# Verticals: Smoke Tests

## Configuration

There is a `smoke-tests.json` file that contains:

* A `SMOKE_ONLY` boolean that tells the suite to use a smaller set of data.
* The list of domains and for each domain, `smoke` and `detailed` list of pages.

## Commands

### Updates the snapshots

```script
npm run update-snapshots
```

### Runs the end-to-end tests.

```script
npm run test
```

... OR ...

```script
npx playwright test
```

### Starts the interactive UI mode.

```script
npx playwright test --ui
```

### Runs the tests only on Desktop Chrome.

```script
  npx playwright test --project=chromium
```
