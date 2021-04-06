import * as core from '@actions/core'
import * as github from '@actions/github'
import { generate } from './doggo/generator'
;(async function run(): Promise<void> {
  try {
    const ctx = github.context
    var issue_number = core.getInput('issue-number')
    if (!issue_number) {
      issue_number = ctx.payload.pull_request
    }
    if (!issue_number) {
      throw new Error('Not in the context of a PR!')
    }

    const ghCli = new github.GitHub(core.getInput('github-token'))
    const doggo = generate()
    ghCli.issues.createComment({
      ...ctx.repo,
      issue_number: issue_number, // eslint-disable-line @typescript-eslint/camelcase
      body: `![Doggo](${doggo})`
    })
  } catch (e) {
    core.setFailed(e.message)
  }
})()
