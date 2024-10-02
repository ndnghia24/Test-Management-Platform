# Test Management System Functions

The system has 4 access types:

- [ ] Manager - User with access type Manager () will have access to All Dashboard and Projects Assigned to them or Created by them (Overview, Requirements, Attachments, Releases, Modules, Test Cases, Test Plans, Test Runs, Issues, Reports)
- [ ] Tester - Users with access type Tester will have access to Dashboard and Projects Assigned to them (Overview, Requirements, Attachments, Releases, Modules, Test Cases, Test Plans, Test Runs, Issues, Reports)
- [ ] Developer - Users with access type Developer will have access only to Issues of Projects Assigned to them.
- [ ] Admin - User with access type Tester and Admin access (Marked as "This user is an administrator") will have access to All Projects, Dashboard, and Administration options (Users Management, Roles Management, Site Settings).

## Users (\*)

- [ ] Register
- [ ] Login
- [ ] Logout

## Administration (\*\*)

- [ ] View User List with Pagination, Search
- [ ] Add, Delete User
- [ ] Import, Export Users

## Projects (\*)

- [ ] Add, Edit, Delete Project
- [ ] View Project List with Pagination, Search, Filter
- [ ] View Project Overview (number of Releases, number of TCs, number of TRs, number of Issues, Open Releases Status)
- [ ] Assign User with role (Manager/Tester/Developer), Remove User

## Requirements (\*)

- [ ] Add, Edit, Delete Requirement
- [ ] Import, Export Requirements
- [ ] View Requirement List with Pagination, Search, Filter
- [ ] View Requirement Details with linked TCs

## Test Plans

- [ ] Add, Edit, Delete Test Plan
- [ ] View Test Plan List
- [ ] View Test Plan Details

## Releases (\*)

- [ ] Add, Edit, Delete Release
- [ ] View Release List
- [ ] View Release Details with statistics of TCs & TRs

## Modules

- [ ] Add, Edit, Delete Module
- [ ] View Module List

## Test Cases (TC) (\*)

- [ ] Add, Edit, Delete TC
- [ ] Link TC to Requirements
- [ ] Import, Export TCs
- [ ] View TC List with Pagination, Search, Sort, Filter
- [ ] View TC Details (Id, Name/Objective, Module, Description, Pre-condition, Steps, Created At, Created By, Updated At, Linked Requirements, Linked Issues)

## Test Runs (TR) (\*)

- [ ] Add, Edit, Delete TR
- [ ] View TR List
- [ ] View TR Details (Project Status, Issue Status, Release, TCs with Test Results)
- [ ] Add, Remove TCs to TR
- [ ] Add Issue to TC
- [ ] Bulk Action: Change Status, Assigned to for one or many TCs in TR

## Issues/Bugs (\*)

- [ ] Add, Edit, Delete Issue
- [ ] Import, Export Issues
- [ ] View Issue List with Pagination, Search, Sort, Filter
- [ ] View Issue Details (ID, Title, Description, Steps to reproduce, Environment, Module, Release, Priority, Severity, Attachments, Status, Assign to, Linked TCs)
- [ ] Bulk action: Change Status, Change Priority, Change Severity, Asssigned User (Developer) for one or many Issues
- [ ] Add, Delete Comment

## Reports (\*\*)

- [ ] Requirements Traceability Summary Report (This Report is useful to quickly and easily see which requirements have been mapped,and which requirements have not yet been mapped with the test case .In the report you can see all the Requirements, including linked test cases and test run status.)
- [ ] Test Run Assignee Summary Report (The report shows an overview of the test results across all of theTest runs you include in the report, based on the assignees assigned to the Test run.)
- [ ] Releases Summary Report (In this report, you are able to see the Requirement mapped to selected Release along with its details.)
