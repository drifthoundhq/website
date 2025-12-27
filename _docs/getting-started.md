---
layout: docs
title: "Getting Started with DriftHound"
category: "getting-started"
order: 1
description: "Introduction to DriftHound infrastructure drift detection platform"
toc: true
---

# Getting Started with DriftHound

DriftHound is a watchdog for your infrastructure state, monitoring Terraform, OpenTofu, and Terragrunt for configuration drift. It helps you detect when your actual infrastructure diverges from the state defined in your infrastructure-as-code files.

## What is Infrastructure Drift?

Infrastructure drift occurs when your actual infrastructure diverges from the state defined in your infrastructure-as-code files. This can happen for several reasons:

- **Manual changes** made directly in the cloud console
- **Emergency fixes** applied outside of the normal workflow
- **Unauthorized modifications** by team members
- **External automation** or services modifying resources
- **State file corruption** or synchronization issues

DriftHound continuously monitors your infrastructure and alerts you when drift is detected, helping you maintain consistency and reliability.

## Key Features

- **Multi-Tool Support**: Works with Terraform, OpenTofu, and Terragrunt
- **Continuous Monitoring**: Run drift detection on a schedule or on-demand
- **GitHub Actions Integration**: Native integration for CI/CD workflows
- **Kubernetes Deployment**: Deploy as a CronJob for scheduled monitoring
- **Slack Notifications**: Get instant alerts when drift is detected
- **Detailed Reporting**: Visual charts and comprehensive drift reports
- **Multi-Cloud**: Supports AWS, Azure, Google Cloud, and more

## Quick Start Options

Choose the deployment method that works best for your workflow:

### GitHub Action (Recommended)

Perfect for integrating drift detection into your CI/CD pipeline:

```yaml
- uses: drifthoundhq/drifthound-action@v1
  with:
    terraform-dir: ./infrastructure
```

[View GitHub Action Quick Start →](/docs/github-action/quickstart/)

### Kubernetes CronJob

Ideal for scheduled, automated drift detection:

```bash
helm repo add drifthound https://drifthoundhq.github.io/helm-chart
helm install drifthound drifthound/drifthound
```

[View Configuration Guide →](/docs/core/configuration/)

### Docker CLI

For ad-hoc drift detection and testing:

```bash
docker run -v $(pwd):/workspace ghcr.io/drifthoundhq/drifthound:latest \
  drifthound detect --directory /workspace
```

[View CLI Usage Guide →](/docs/core/cli-usage/)

## Architecture Overview

DriftHound follows a simple workflow:

1. **Plan Generation**: Runs `terraform plan` or equivalent to detect changes
2. **Drift Analysis**: Analyzes the plan output to identify drift
3. **Reporting**: Generates visual charts and detailed reports
4. **Notification**: Sends alerts via Slack or other channels (optional)
5. **Storage**: Stores results for historical tracking (optional)

## Core Components

### Detection Engine

The detection engine supports multiple IaC tools:
- **Terraform** (all versions)
- **OpenTofu** (all versions)
- **Terragrunt** (with Terraform/OpenTofu)

### API Server

Optional API server for:
- Storing drift detection results
- Viewing historical drift trends
- Managing multiple projects
- Team collaboration

[Learn more about API usage →](/docs/core/api-usage/)

### Notification System

Built-in notification support:
- Slack webhooks
- Custom webhooks
- GitHub Comments (via Action)
- Email (via custom integrations)

[Configure Slack notifications →](/docs/core/slack-notifications/)

## Common Use Cases

### CI/CD Pipeline Integration

Run drift detection on every pull request to ensure changes match the expected plan:

```yaml
name: Drift Detection
on: [pull_request]
jobs:
  detect-drift:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: drifthoundhq/drifthound-action@v1
```

### Scheduled Monitoring

Deploy DriftHound as a Kubernetes CronJob to monitor drift on a schedule:

```yaml
schedule: "0 */6 * * *"  # Every 6 hours
```

### Multi-Environment Tracking

Monitor multiple environments with separate configurations:

```bash
drifthound detect --directory ./prod --project production
drifthound detect --directory ./staging --project staging
```

## Next Steps

Now that you understand the basics, dive deeper into specific topics:

- [Configuration Guide](/docs/core/configuration/) - Configure DriftHound for your environment
- [CLI Usage](/docs/core/cli-usage/) - Master the command-line interface
- [API Usage](/docs/core/api-usage/) - Integrate with the API server
- [GitHub Action Setup](/docs/github-action/quickstart/) - Set up the GitHub Action
- [Slack Notifications](/docs/core/slack-notifications/) - Configure Slack alerts

## Getting Help

If you encounter issues or have questions:

- Check the [GitHub Issues](https://github.com/drifthoundhq/drifthound/issues)
- Join the [Discussions](https://github.com/drifthoundhq/drifthound/discussions)
- Review the [Contributing Guide](/docs/github-action/contributing/)

## Version Information

This documentation covers DriftHound **{{ site.version }}**. For information about older versions or upcoming features, see the [Changelog](/changelog/).
