## R example
iris
plot(iris)
head(iris)
summary(iris)
plot(iris$Sepal.Length)
plot(iris$Petal.Length, iris$Petal.Width)
install.packages("ggplot2")
library(ggplot2)
hist(iris$Sepal.Length)
qplot(data = iris,Sepal.Length, geom = "boxplot")
qplot(data=iris, Petal.Length, fill=Petal.Width, geom = "histogram")
