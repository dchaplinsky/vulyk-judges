#!/usr/bin/env python
# -*- coding: utf-8 -*-

try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

with open('README.rst') as readme_file:
    readme = readme_file.read()

with open('HISTORY.rst') as history_file:
    history = history_file.read().replace('.. :changelog:', '')

with open('requirements.txt', 'r') as fd:
    requirements = list(filter(
        lambda r: not r.strip().startswith('#'), fd.readlines()))

test_requirements = requirements

setup(
    name='vulyk_judges',
    version='0.1.0',
    description="Vulyk judges plugin",
    long_description=readme + '\n\n' + history,
    author="Dmytro Chaplynskyi",
    author_email='chaplinsky.dmitry@gmail.com',
    url='https://github.com/hotsyk/vulyk_judges',
    packages=[
        'vulyk_judges',
        'vulyk_judges.models',
        'vulyk_judges.static'
    ],
    package_dir={'vulyk_judges':
                 'vulyk_judges'},
    include_package_data=True,
    install_requires=requirements,
    license="BSD",
    zip_safe=False,
    keywords='vulyk_judges',
    classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Natural Language :: English',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
    ],
    test_suite='tests',
    tests_require=test_requirements
)
