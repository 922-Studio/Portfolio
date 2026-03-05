#!/usr/bin/env python3
"""
Determine the next semantic version based on conventional commit messages.
Standalone version (no AI/Gemini dependency).
"""

import argparse
import re
import sys

_SUBJECT_RE = re.compile(r'^(\w+)(\([^)]+\))?(!)?:')


def get_current_version(version_file):
    """Reads the current version from the specified file, defaulting to 0.1.0."""
    try:
        with open(version_file, "r") as f:
            return f.read().strip()
    except FileNotFoundError:
        return "0.1.0"


def get_version_bump_from_commits(commits: str) -> str:
    """Determines version bump level from conventional commit messages."""
    level = 0  # 0=PATCH, 1=MINOR, 2=MAJOR
    for line in commits.splitlines():
        line = line.strip()
        if not line:
            continue
        # Check for BREAKING CHANGE footer in commit body
        if line.startswith("BREAKING CHANGE:") or line.startswith("BREAKING-CHANGE:"):
            level = 2
            break  # MAJOR is maximum; no need to continue
        m = _SUBJECT_RE.match(line)
        if m:
            commit_type = m.group(1).lower()
            has_bang = m.group(3) == '!'
            if has_bang:
                level = 2
                break  # MAJOR is maximum; no need to continue
            if commit_type == 'feat':
                level = max(level, 1)
            # fix:, ci:, chore:, etc. -> PATCH (level 0), already covered by default
    return ['PATCH', 'MINOR', 'MAJOR'][level]


def get_next_version(current_version, bump_level):
    """Calculates the next version based on the bump level."""
    major, minor, patch = map(int, current_version.split("."))
    if bump_level == "MAJOR":
        major += 1
        minor = 0
        patch = 0
    elif bump_level == "MINOR":
        minor += 1
        patch = 0
    else:  # PATCH
        patch += 1
    return f"{major}.{minor}.{patch}"


def main():
    """Entry point: determines the next version based on commit messages."""
    parser = argparse.ArgumentParser(description="Determine the next version based on commit messages.")
    parser.add_argument("--commits", required=True, help="A string containing all commit messages.")
    parser.add_argument("--version-file", default="version.txt", help="The file containing the current version.")
    args = parser.parse_args()

    current_version = get_current_version(args.version_file)

    print("🔍 Determining next version from conventional commits...", file=sys.stderr)
    bump_level = get_version_bump_from_commits(args.commits)

    next_version = get_next_version(current_version, bump_level)
    print(next_version)


if __name__ == "__main__":
    main()
