@isTest
private class AccountControllerTests {
   private static Integer  testValuesLeng = 13;

    @testSetup

    static void setupTestData() {
        // Создаем тестовые данные
        List<Account> testAccounts = new List<Account>();
        for (Integer i = 0; i < testValuesLeng; i++) {
            testAccounts.add(new Account(
                Name='Test Account ' + i,
                Budget__c = 1000 * i,
                NumberOfEmployees = 10 * i,
                Type = 'Customer',
                OwnerId = UserInfo.getUserId(),
                Industry = 'Technology',
                Description = 'Test description'
            ));
        }
        insert testAccounts;
    }

    @isTest
    static void testGetAccountsData() {
        // Вызываем метод контроллера
        List<Account> resultAccounts = AccountController.getAccontsData();

        // Проверяем, что результат не является null
        System.assertNotEquals(null, resultAccounts, 'Result should not be null');

        // Проверяем, что количество записей соответствует ожидаемому
        System.assertEquals(testValuesLeng, resultAccounts.size(), 'Number of accounts should match');

        // Проверяем, что поля объектов заполнены корректно
        for (Integer i = 0; i < resultAccounts.size(); i++) {
           String a= 'Test Account ' + i;
            Account expectedAccount = [SELECT Name, Budget__c, NumberOfEmployees, Type, Owner.Name, Industry, Description FROM Account WHERE Name =: a LIMIT 1];
            Account actualAccount = resultAccounts[i];

            System.assertEquals(expectedAccount.Name, actualAccount.Name, 'Account Name should match');
            System.assertEquals(expectedAccount.Budget__c, actualAccount.Budget__c, 'Budget should match');
            System.assertEquals(expectedAccount.NumberOfEmployees, actualAccount.NumberOfEmployees, 'Number of Employees should match');
            System.assertEquals(expectedAccount.Type, actualAccount.Type, 'Type should match');
            System.assertEquals(expectedAccount.Owner.Name, actualAccount.Owner.Name, 'Owner Name should match');
            System.assertEquals(expectedAccount.Industry, actualAccount.Industry, 'Industry should match');
            System.assertEquals(expectedAccount.Description, actualAccount.Description, 'Description should match');
        }
    }
}
