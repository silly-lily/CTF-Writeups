### Jonah's Journal
After dinner, Jonah took notes into an online notebook and pushed his changes there. His usernames have been relatively consistent but what country is he going to next? Flag should be in format` uiuctf{country_name}`

---

#### Sherlock
In Whats for Dinner, we found that Jonah's Twitter username is `@jonahexplorer`. Using Sherlock, we check if he has reused this username across other websites:

![Sherlock](sherlock.png)

---

#### GitHub

There is a GitHub account with a matching username:

![GitHub](github.png)

We look at the only repository:

![Adventure Code Repository on GitHub](repository.png)

The repository has two branches:

![Adventure Code Branches](branches.png)

We notice that the entry-2 branch is 2 commits ahead of main:

![Adventure Code Entry 2 Branch](entry2.png)

We look at old commits and notice the next country Jonah is going to is Italy.

![Flag](flag.png)

---

#### Flag
> uiuctf{italy}

---