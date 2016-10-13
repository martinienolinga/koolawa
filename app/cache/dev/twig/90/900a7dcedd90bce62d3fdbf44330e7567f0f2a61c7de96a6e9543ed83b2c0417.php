<?php

/* @Framework/Form/money_widget.html.php */
class __TwigTemplate_8e42ceb546080d6c52f432abfbef1600813e266778d216ee296a37a033b1612b extends Twig_Template
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
        $__internal_fb26c1a9f71f86d6401267a182e54152aca60556b275c3b67cd46a02de9745de = $this->env->getExtension("native_profiler");
        $__internal_fb26c1a9f71f86d6401267a182e54152aca60556b275c3b67cd46a02de9745de->enter($__internal_fb26c1a9f71f86d6401267a182e54152aca60556b275c3b67cd46a02de9745de_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/money_widget.html.php"));

        // line 1
        echo "<?php echo str_replace('";
        echo twig_escape_filter($this->env, (isset($context["widget"]) ? $context["widget"] : $this->getContext($context, "widget")), "html", null, true);
        echo "', \$view['form']->block(\$form, 'form_widget_simple'), \$money_pattern) ?>
";
        
        $__internal_fb26c1a9f71f86d6401267a182e54152aca60556b275c3b67cd46a02de9745de->leave($__internal_fb26c1a9f71f86d6401267a182e54152aca60556b275c3b67cd46a02de9745de_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/money_widget.html.php";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <?php echo str_replace('{{ widget }}', $view['form']->block($form, 'form_widget_simple'), $money_pattern) ?>*/
/* */
