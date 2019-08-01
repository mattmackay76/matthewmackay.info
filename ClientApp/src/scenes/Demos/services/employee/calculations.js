//annualBenefitExpense: 1000
//annualDependentBenefitExpense: 500
//annualPayPeriods: 26
//dependents: (5)[{ … }, { … }, { … }, { … }, { … }]
//id: "5d429099ef074029889cec8b"
//salaryPerPeriod: 2000

function individualStats(employee) {
    const discountPercentage = .1; //10%
    const dependentCount = employee.dependents.length;
    const annualDependentsCost = employee.annualDependentBenefitExpense * dependentCount;
    const annualSalaryExpense = employee.annualPayPeriods * employee.salaryPerPeriod;
    const hasDiscount = employee.name ? employee.name[0].toUpperCase() === 'A' : false;
    const annualCost =
        annualSalaryExpense
        + employee.annualBenefitExpense
        + annualDependentsCost;
    const discount = hasDiscount ? annualCost * discountPercentage : 0;
    const totalAnnualCost = annualCost - discount;
    

    return {
        discountPercentage,
        dependentCount,
        annualDependentsCost,
        annualSalaryExpense,
        annualPayPeriods: employee.annualPayPeriods,
        hasDiscount,
        discount,
        annualCost,
        totalAnnualCost
    }
}

function aggregateEmployeeStats(employeeStats) {
    const keys = Object.keys(employeeStats);
    const totalAnnualCost = keys.reduce((acc, key) => employeeStats[key].totalAnnualCost + acc, 0);
    const totalDiscounted = keys.reduce((acc, key) => employeeStats[key].discount + acc, 0);
    return {
        total: Object.keys(employeeStats).length,
        totalAnnualCost,
        totalDiscounted,
    }
}

export function employeesStats(employees) {
    const employeeStats = Object.keys(employees).reduce((acc, cur) => {
        acc[cur] = individualStats(employees[cur])
        return acc
    }, {});
    
    return {
        individual: employeeStats,
        aggregate: aggregateEmployeeStats(employeeStats),
    };
}