<?php

/* @Framework/Form/choice_widget.html.php */
class __TwigTemplate_b8e0fecf2b33c6893d8bddde8f0a6d77ed1dbe0e8332d858c6bf255c2123e334 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_8d463c920ce06fc62fa6aa26bff21bdc6c46d6e4b17bc7bf49b2864f1f31b737 = $this->env->getExtension("native_profiler");
        $__internal_8d463c920ce06fc62fa6aa26bff21bdc6c46d6e4b17bc7bf49b2864f1f31b737->enter($__internal_8d463c920ce06fc62fa6aa26bff21bdc6c46d6e4b17bc7bf49b2864f1f31b737_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/choice_widget.html.php"));

        // line 1
        echo "<?php if (\$expanded): ?>
<?php echo \$view['form']->block(\$form, 'choice_widget_expanded') ?>
<?php else: ?>
<?php echo \$view['form']->block(\$form, 'choice_widget_collapsed') ?>
<?php endif ?>
";
        
        $__internal_8d463c920ce06fc62fa6aa26bff21bdc6c46d6e4b17bc7bf49b2864f1f31b737->leave($__internal_8d463c920ce06fc62fa6aa26bff21bdc6c46d6e4b17bc7bf49b2864f1f31b737_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/choice_widget.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <?php if ($expanded): ?>*/
/* <?php echo $view['form']->block($form, 'choice_widget_expanded') ?>*/
/* <?php else: ?>*/
/* <?php echo $view['form']->block($form, 'choice_widget_collapsed') ?>*/
/* <?php endif ?>*/
/* */
